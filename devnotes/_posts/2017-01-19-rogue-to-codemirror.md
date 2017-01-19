---
layout: post
title: Rogue 대신 Codemirror!
date: 2017-01-19 14:00:00 +0900
tags: [codemirror, jekyll]
---

신택스 하이라이트에 JSX가 제대로 작동하지 않는 듯해서 jneen/rouge의 이슈트래커를 보니 [이런 코멘트](https://github.com/jneen/rouge/issues/275#issuecomment-149714664)가 있어서 놀랬습니다.

> zackify: Any status update on this?
>
> jneen: No

물론 지금은 대응하는 것 같은데 지킬에서 어떻게 쓰는지 잘 모르겠네요.
크램다운도 도큐멘트가 오래되어보이고... 역시 그냥 익숙한 방식대로 하는게 맞는 것 같아서 익숙한 CodeMirror로 Rogue대신에 프론트엔드에서 신택스 하이라이트를 처리해 보았습니다.

## Disable Rogue

먼저 로그를 꺼야겠죠...

`_config.yml`에서 크램다운의 하이라이트 옵션을 수정합니다.

```yml
markdown: kramdown
kramdown:
  syntax_highlighter_opts:
    disable: true
```

## Apply Codemirror

좀 많은 라이브러리를 동시에 사용하고 있습니다.

- Lodash : `forEach`와 `unescape`를 사용하기 위해 씁니다.
- Runmode : 에디터가 아니라 렌더링만 하는 모드입니다. 코드미러 본체를 추가하지 않고도 쓸 수 있는 스탠드얼론도 있지만 모드검색등의 다른 모듈을 이용하기위해 애드온으로 추가합니다.
- Meta : 코드미러에서 사용가능한 신택스 모드 리스트와 이를 검색하기위한 메소드를 추가해줍니다.
- Load Mode : 직접 신택스모드를 부를 필요없이 필요할 경우에만 부를 수 있게 해줍니다.(수십개의 모드를 직접 불러오는건 그다지 유쾌하지 않을겁니다.)
- Overlay : HTML의 `<script>`에 쓰이는 Javascript나 Markdown의 Code Fence에 쓰이는 각종 코드를 위해 복수의 신택스모드를 겹쳐쓰게 해줍니다.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/codemirror.min.css">
<!-- 저는 Dracula 테마를 쓸 겁니다 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/theme/dracula.min.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/addon/runmode/runmode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/mode/meta.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/addon/mode/loadmode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/addon/mode/overlay.min.js"></script>
<script>

// 어디서 모드를 불러올지를 적어줍니다.
CodeMirror.modeURL = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.22.2/mode/%N/%N.js'
var codeBlocks = document.querySelectorAll('pre code')

// 저는 JSX를 주로 쓰므로 js나 javascript 모두 JSX로 처리하게 했습니다.
function parseMode (mode) {
  switch (mode) {
    case 'js':
    case 'javascript':
      mode = 'jsx'
  }
  let syntax = CodeMirror.findModeByName(mode)
  if (syntax == null) syntax = CodeMirror.findModeByName('Plain Text')
  return syntax
}

_.forEach(codeBlocks, block => {
  // 클래스의 프리픽스 `language-`를 지우고 모드를 파스합니다.
  var syntax = parseMode(block.className.substring(9))

  CodeMirror.requireMode(syntax.mode, () => {
    // 이미 이스케이프된 `&gt;`등 엔티티를 `>`로 돌려줍니다
    var value = _.unescape(block.innerHTML)
    // 런모드 전에 내용을 다 정리해둡니다.
    block.innerHTML = ''
    // 테마를 적용합니다
    block.parentNode.className = `cm-s-dracula CodeMirror`
    // 렌더를 시작합니다
    CodeMirror.runMode(value, syntax.mime, block, {
      tabSize: 2
    })
  })
})
</script>
```

이상입니다. 이제 페이지가 열리면 `<pre><code>`를 자동으로 검색해서 코드미러로 렌더링 하게 될겁니다.
