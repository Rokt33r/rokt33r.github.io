---
layout: post
title: Remark Math를 만들면서 정리해본 NPM 라이브러리 배포 노하우
date: 2017-03-05 22:00:00 +0900
tags: [markdown, remark, latex, npm, jest]
---

본 포스팅은 Charcoal 프로젝트를 위한 [Remark][remark]의 수학기호 블럭/인라인 처리를 위한 플러그인 [Remark Math][remark-math]를 만드는 포스팅이다.

무엇을 어떻게 만드는지에 대한 분석부터, NPM으로 어떻게 디플로이하는지까지 다룬다.

## [Remark][remark]?

상당히 체계적으로 설계된 마크다운 프로세서 라이브러리이다. 이 라이브러리의 강점은 상당히 모듈화가 잘 되어있기 때문에 이곳 저곳을 뜯어보거나 개조 할 수 있다. 물론 모듈화가 심하기 때문에 각 모듈들이 무엇을 하는지에 대해 파악하기 어려운 점이 있긴 하지만 파싱하는 어프로치등 상당히 배울만한 것이 많은 라이브러리 이기도 하다.

> [제작자 Wooorm](http://wooorm.com/)씨는 자연어, 마크업 언어 처리에 상당한 기술을 가지고 있기에, 이 라이브러리의 기반 라이브러리로 HTML파서나 자연어 파서 그리고 이를 활용한 문법 린터까지 오픈소스로 개발 하고 있다. 이 쪽 분야에 흥미가 있다면 꼭 이 분이 만든 라이브러리를 참고하길 추천한다!

먼저 Remark의 인터페이스, [Unified][wooorm/unified]를 살펴보자. 프로세서 인터페이스로써, 파서, 트랜스포머, 컴파일러러가 통합된 텍스트를 가공하기위한 일종의 레시피와 같은 역할을 한다.

```
                     ┌──────────────┐
                  ┌─ │ Transformers │ ─┐
                  ▲  └──────────────┘  ▼
                  └────────┐  ┌────────┘
                           │  │
            ┌────────┐     │  │     ┌──────────┐
  Input ──▶ │ Parser │ ──▶ Tree ──▶ │ Compiler │ ──▶ Output
            └────────┘              └──────────┘
```

1. 마크다운 문서를 Abstract Syntax Tree(AST)로 파스한다.
2. AST의 구조를 바꾼다.
3. 컴파일러를 통해 AST를 다시 문자열로 바꾼다.

좀 더 이해하기 쉬운 설명을 위해 JSON을 예로 들면 다음과 같은 느낌이다.

1. JSON문자열을 Object로 파스한다.
2. Object를 수정한다.
3. 다시 Object를 Stringify로 문자열화 시킨다.

그럼 사용하는 코드를 살펴보자.

```js
const remark = require('remark')
const html = require('remark-html')
const processor = remark().use(html)

const targetText = '# hello'

const parsedAST = process.parse(targetText)
/* 타겟 문자열 => AST 트리 (파싱)
{
  "type": "root",
  "children": [
    {
      "type": "heading",
      "depth": 1,
      "children": [
        {
          "type": "text",
          "value": "hello",
          "position": {
            "start": {
              "line": 1,
              "column": 3,
              "offset": 2
            },
  ... 생략
*/

processor.stringify(parsedAST)
/* AST => HTML 문자열 (컴파일링)
<h1>hello</h1>
*/

processor.process(targetText)
/* 타겟 문자열 => AST => HTML 문자열 (파싱 & 컴파일링)
<h1>hello</h1>
*/
```
## 왜 만드나?

물론, [remark-inline-math]라는 플러그인이 이미 존재하지만, 인라인만을 파싱할 뿐이기에 블럭도 파싱 가능하도록 한다. 또한, 렌더링 방법까지는 구현되있지 않으므로 이 부분까지 추가적인 개발을 한다.

또한 Latex파서/렌더러는 [Katex][katex]와 [MathJax][mathjax]를 선택할 수 있도록 한다. 단, 본 포스트에서는 Katex를 지원하는 부분까지만 만든다.

## 어떻게 만들 것인가?

[Remark Math][remark-math]에 어떤 기능이 필요한지 검토를 해보자.

[remark-inline-math]의 경우 파서에 `$`로 감싸진 코드를 찾는 메소드를 추가시켜 이를 인라인 코드 요소로 읽어 줄 뿐이다. 고로 Latex을 컴파일 하기 위해서는 이미 HTML로 컴파일된 것을 다시 한번 읽어서 Latex를 렌더시켜주는 코드가 따로 필요하다.

또한, 인라인 토크나이저만 포함되어있기 때문에 블록용의 토크나이저를 새로 만들 필요가 있다. 블록 요소는 `$$`로 감싸진 코드를 가져오도록 한다.

또, 좀 더 효과적인 사용을 위해 MDAST에 타입을 추가하여 블럭 요소는 `math`로 인라인 요소는 `inlineMath`로 파싱하도록 한다.

마지막으로, 플러그인 옵션으로 유저가 Katex로(그리고 나중에는 MathJax로도) 컴파일 시켜주는 컴파일링 메소드를 추가한다.

## 인라인 파싱

먼저 [remark-inline-math]의 코드를 확인해보자.

```js
function locator (value, fromIndex) {
	return value.indexOf('$', fromIndex);
}

const RE_MATH = /^\$((?:\\\$|[^$])+)\$/;

function tokenizer (eat, value, silent) {
	const match = RE_MATH.exec(value);

	if (match) {
		if (silent) {
			return true;
		}

		return eat(match[0])({
			type: 'inlineCode',
			value: match[1].trim(),
			data: {
				lang: 'math'
			}
		});
	}
}

tokenizer.locator = locator;
tokenizer.notInLink = true;

function plugin (processor) {
	const Parser =  processor.Parser;
	const tokenizers = Parser.prototype.inlineTokenizers;
	const methods = Parser.prototype.inlineMethods;

	tokenizers.math = tokenizer;
	methods.splice(methods.indexOf('text'), 0, 'math');
}
```

> [https://github.com/bizen241/remark-inline-math/blob/master/index.js](https://github.com/bizen241/remark-inline-math/blob/master/index.js)

구현을 살펴보면 `locator`와 `tokenizer`로 나뉘어져있다. [문서 설명](https://github.com/wooorm/remark/tree/master/packages/remark-parse#tokenizerlocatorvalue-fromindex)에 따르면 `locator`는 인라인 토크나이징에서 좀더 빠르게 토큰을 찾을 수 있도록 도와준다. 하지만, 실질적인 요소를 확정시키는 부분은 `tokenizer`에서 일어나기에 혹시 잘못되더라도 문제는 없는 듯 하다.

그리고 만들어진 `tokenizer`는 프로세서의 파서 `Parser.prototype.inlineMethods`로 직접 주입시킨다.

위의 코드는 파싱부분은 충분히 역할을 수행하고 있기에 따로 다룰 필요는 없을 것이다. 고로, `inlineCode`만 `inlineMath`로 바꾼다.

```js
// inlineParser.js
function locator (value, fromIndex) {
  return value.indexOf('$', fromIndex)
}

const INLINE_MATH = /^\$((?:\\\$|[^$])+)\$/

function inlineTokenizer (eat, value, silent) {
  const match = INLINE_MATH.exec(value)

  if (match) {
    if (silent) {
      return true
    }

    return eat(match[0])({
      type: 'inlineMath', // inlineCode => inlineMath
      value: match[1].trim()
    })
  }
}

inlineTokenizer.locator = locator
inlineTokenizer.notInLink = true

module.exports = function inlineParserPlugin (p) {
  const Parser = p.Parser

  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.math = inlineTokenizer
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'math')
}
```

## 블록 파싱

블록파싱은 리마크 자체의 [코드펜스 토크나이저](https://github.com/wooorm/remark/blob/master/packages/remark-parse/lib/tokenize/code-fenced.js)를 수정한다. 백틱<code>\`</code>과 틸드`~` 메소드 순서는 코드 펜스 다음으로 넣어준다.

이외의 info string<code>```javascript</code>이나 2개이상의 기호를 핸들링하는 부분은 남겨둔다.

> [Info string](http://spec.commonmark.org/0.27/#info-string)은 GFM 코드펜스에서 <code>```javascript</code>의 신택스 모드를 지정하는 문자열을 의미한다.

또한, 이 부분의 코드는 [trim-trailing-lines](https://github.com/wooorm/trim-trailing-lines)에 의존하기 때문에 NPM으로 추가적으로 설치해준다.

```
npm i -S trim-trailing-lines
```

편집한 부분의 코드는 다음과 같다.

```js
// blockParser.js

// 중략...

/* Characters */
var C_NEWLINE = '\n'
var C_TAB = '\t'
var C_SPACE = ' '
// C_TILD와 C_TICK은 DOLLAR로 바꿔준다.
var C_DOLLAR = '$'

/* Constants */
var MIN_FENCE_COUNT = 2 // 코드펜스의 경우 3개이상의 틱(```)으로 시작하지만 매스블록은 2개의 달러($$)만으로 처리할 수 있도록 한다.
var CODE_INDENT_COUNT = 4

/**
 * Tokenise math block.
 *
 * @property {Function} locator.
 * @param {function(string)} eat - Eater.
 * @param {string} value - Rest of content.
 * @param {boolean?} [silent] - Whether this is a dry run.
 * @return {Node?|boolean} - `math` node.
 */
function blockTokenizer (eat, value, silent) {
  // 중략... C_TILD와 C_TICK를 확인하는 코드는 C_DOLLAR로 교체하면 된다.

  return eat(subvalue)({
    type: 'math',
    value: trim(exdentedContent)
  })
}

module.exports = function blockParserPlugin (p) {
  const Parser = p.Parser

  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods
  blockTokenizers.math = blockTokenizer
  // 인라인과 동일하다. 앞서 설명한대로 메소드는 코드 펜스 뒤로 넣어준다.
  blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'math')
}
```
[원본 코드(Code fence tokenizer): https://github.com/wooorm/remark/blob/master/packages/remark-parse/lib/tokenize/code-fenced.js](https://github.com/wooorm/remark/blob/master/packages/remark-parse/lib/tokenize/code-fenced.js)

## 파싱 플러그인

두개의 파서는 이미 플러그인으로 작동 가능하다.

```js
const inline = require('./inlineParser')
const block = require('./blockParser')

const processor = remark()
  .use(inline)
  .use(block)
```

그리고 둘을 동시에 사용할 경우, 다음과 같이 결합 시킬 수 있다.

```js
// parser.js
const inline = require('./inlineParser')
const block = require('./blockParser')

function mathParser (p) {
  inline(p)
  block(p)
}

const processor = remark()
  .use(mathParser)
```

제대로 작동하는지 확인해보자.

```js
const remark = require('remark')
const math = require('../parser')

const render = remark()
  .use(math)


const text = `
Inline math! $\\alpha$

Math block

$$
\\beta
$$

Below code should not be parsed as Math block

\`\`\`
$$
\\gamma
$$
\`\`\`
`

console.log(JSON.stringify(render.parse(text), null, 2))
```

실행해볼 경우 알파는 인라인으로, 베타는 블록으로, 감마는 코드펜스에 들어있기에 파싱이 되지 않은 것을 확인 할 수 있다.

```
{
  "type": "inlineMath",
  "value": "\\alpha",
}
...
{
  "type": "math",
  "value": "\\beta",
}
...
{
  "type": "code",
  "lang": null,
  "value": "$$\n\\gamma\n$$",
}
```

## 컴파일러

[Remark][remark] 자체에는 HTML로의 렌더기능이 들어 있지 않다. 자체의 `stringify`는 마크다운 AST(MDAST)를 그대로 마크다운으로 돌려주는 역할을 할 뿐이고, 처음의 코드 예제는 `stringify`를 바꾸어주는 [remark-html]을 사용했기 때문에 HTML로 컴파일 되었을 뿐이다.

단, [remark-html]는 단순하게 컴파일러가 아닌 트랜스포머와 컴파일러가 결합된 플러그인이다. MDAST를 HAST(HTML AST)로 변환(트랜스폼)후에 HTML로 컴파일한다.

문제는 방금 만든 파서 플러그인은 MDAST에 없는 `math`와 `inlineMath` 타입을 추가했지만, [remark-html]은 이 타입들을 인식하지 못하기 때문에 HTML로 컴파일 시 다음과 같은 결과가 나온다.

```html
<p>Inline math! \alpha</p>
<p>Math block</p>
\beta
<p>Below code should not be parsed as Math block</p>
<pre><code>$$
\gamma
$$
</code></pre>
```

하지만, 다행히 [remark-html]는 MDAST 노드의 `data.hName`, `data.hChildren`, `data.hProperties` 프로퍼티들을 통해 해당 노드가 뭔지 모르더라도 어떻게 HTML로 컴파일 될지 지정하는게 가능하므로, 컴파일러 개조없이 파서에 3가지 프로퍼티들을 지정해줌으로써 간단히 해결 할 수 있다.

단, `value`를 `children`로 바꿔서 넣어줘야한다. 그렇지 않으면, 프로퍼티를 읽지않고, 그냥 플레인 텍스트로 돌려준다.

> - Unknown nodes with children are transformed to div elements;
> - Unknown nodes with value are transformed to text nodes;
>
> [https://github.com/syntax-tree/mdast-util-to-hast#note](https://github.com/syntax-tree/mdast-util-to-hast#note)

### [Katex][katex]

칸 아카데미에서 만들어진 TeX 수식 렌더러이다. 렌더러 코드와 렌더된 HTML을 위한 스타일(CSS)로 구성되어 있다.

고로, 렌더된 HTML을 CSS와 함께 브라우저로 열어야지 제대로된 시작적인 결과물을 얻을 수 있다. 사용법은 다음과 같다.

```js
var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
// '<span class="katex">...</span>'
```

HTML에 CSS를 추가시켜주어야 한다.

```html
<html>
<head>
...생략...
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" integrity="sha384-wITovz90syo1dJWVh32uuETPVEtGigN07tkttEqPv+uR2SE/mbQcG7ATL28aI9H0" crossorigin="anonymous">
</head>
...생략...
</html>
```

### 적용

그럼 본 코드에 적용을 해보자. 먼저, Latex 컴파일은 MathJax와 Katex중에 하나를 선택해서 사용 가능하도록 할 생각이므로, 플러그인 옵션에서 선택할 수 있게 해야한다. 또한, 렌더된 수식이 들어갈 엘러먼트의 속성도 옵션으로 덮어 쓸 수 있게 해준다.

먼저 [Rehype][rehype]가 의존 요소로, [Remark][remark], [remark-html], [Katex][katex]데모용으로 필요하다. Rehype는 Remark제작자가 만든 라이브러리로 Remark처럼 HTML을 AST화시키거나 렌더링할때 사용된다. Parse5를 기반으로 만들어져있고, remark-html이 필요로 하는 라이브러리기도 하다.

```sh
npm i -S rehype
npm i -D remark remark-html katex
```

그리고 데모 코드는 다음과 같다.

```js
// demo.js
const remark = require('remark')
const math = require('./parser')
const katex = require('katex')

const opts = {
  // katex,
  inlineProperties: {
    class: 'math-inline'
  },
  blockProperties: {
    class: 'math-block'
  }
}

const processor = remark()
  .use(parser, opts) // use메소드의 두번째 인수로 옵션을 넘겨 줄 수 있다.

// parser.js
const inlineParser = require('./inlineParser')
const blockParser = require('./blockParser')

function parser (p, opts) {
  inlineParser(p, opts)
  blockParser(p, opts)
}
```

인라인파서는 다음과 같이 코드를 바꾸어준다.

```js
// inlineParser.js
const rehype = require('rehype')() // Katex의 결과물을 AST화 시키기 위해 사용한다.

function locator (value, fromIndex) {
  return value.indexOf('$', fromIndex)
}

const INLINE_MATH = /^\$((?:\\\$|[^$])+)\$/

module.exports = function plugin (p, opts = {}) {
  const Parser = p.Parser

  function inlineTokenizer (eat, value, silent) {
    const match = INLINE_MATH.exec(value)

    if (match) {
      if (silent) {
        return true
      }

      const trimmedValue = match[1].trim()
      // HTML 출력시의 Children을 준비한다.
      let hChildren = [{
        type: 'text',
        value: trimmedValue
      }]

      // Katex 렌더러가 존재할 경우
      if (opts.katex != null) {
        const parsedChildrenAST = rehype.parse(opts.katex.renderToString(trimmedValue), {fragment: true})
        hChildren = [parsedChildrenAST]
      }

      return eat(match[0])({
        type: 'inlineMath',
        // 앞서 설명한대로 value대신 children를 사용해야 제대로 변환해준다.
        children: [
          {
            type: 'text',
            value: trimmedValue
          }
        ],
        // 이로써 HTML 결과물을 밑의 엘러먼트 노드로 대체시킨다.
        data: {
          hName: 'span',
          hChildren: hChildren,
          hProperties: opts.inlineProperties
        }
      })
    }
  }
  inlineTokenizer.locator = locator
  inlineTokenizer.notInLink = true

  // Inline math
  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.math = inlineTokenizer
  inlineMethods.splice(inlineMethods.indexOf('text'), 0, 'math')
}
```

조금 아쉬운 점은 [remark-html]로 렌더링을 하기 때문에 Katex의 결과물을 다시 AST로 파싱해서 출력시키고 있다는 점이다.

장점은 [remark-html]이 최종적으로 모든 렌더링을 하기때문에 보안적으로 위험요소가 적어진다.

단점은 Katex 결과물을 다시 파싱해서 렌더링하는 코스트가 아깝다는 건데, [remark-html]과 [remark-html]의 의존성 관계를 가지는 모듈까지 상당부분 새로 작성할 필요가 있다.

> 지금은 이걸 개선하는 비용이 너무 크므로 다음기회에 수정 하도록 한다. 그리고 Charcoal에서는 AST로 파싱하는 부분만 필요하기에 중요도도 떨어진다.

블록 파서도 동일하게 편집해준다.

```js
const rehype = require('rehype')() // Rehype를 추가!

// ... 중략

module.exports = function plugin (p, opts = {}) {
  const Parser = p.Parser

  /**
   * Tokenise fenced code.
   *
   * @property {Function} locator.
   * @param {function(string)} eat - Eater.
   * @param {string} value - Rest of content.
   * @param {boolean?} [silent] - Whether this is a dry run.
   * @return {Node?|boolean} - `code` node.
   */
  function blockTokenizer (eat, value, silent) {

    // ... 중략

    subvalue += content + closing
    // inline과 동일하게 바꿔준다.
    const trimmedValue = trim(exdentedContent)
    let hChildren = [{
      type: 'text',
      value: trimmedValue
    }]
    if (opts.katex != null) {
      const parsedChildrenAST = rehype.parse(opts.katex.renderToString(trimmedValue, {throwOnError: false}), {fragment: true})
      hChildren = [parsedChildrenAST]
    }
    return eat(subvalue)({
      type: 'math',
      children: [
        {
          type: 'text',
          value: trimmedValue
        }
      ],
      data: {
        hName: 'div',
        hChildren: hChildren,
        hProperties: opts.blockProperties
      }
    })
  }
  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods
  blockTokenizers.math = blockTokenizer
  blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'math')
}
```

## 배포 준비

먼저 이 라이브러리의 주요 타겟은 Node.js이고, webpack으로의 컴파일되면 브라우저에서 사용 할 수 있게 한다.

인라인 요소와 블럭 요소 만을 사용할 경우를 고려하여, `require(remark-math/inline)`, `require(remark-math/block)`으로 부분적으로 플러그인을 부를 수 있게 한다.

### 테스트

린트는 [Standard][standard]를 그리고 테스트는 [Jest][jest]로 작성한다.

```sh
# 린터 설치
npm i -D standard babel-eslint
# 테스터 설치
npm i -D jest
```

`package.json`에 스크립트와 린터 설정을 추가한다.

```js
{
  // ...중략...
  "scripts": {
    "test": "jest",
    "lint": "standard",
    "test:watch": "jest --watch"
  },
  // ...중략...
  "standard": {
    "parser": "babel-eslint",
    "plugins": [
      "jest"
    ],
    "envs": [
      "jest"
    ]
  }
}
```

테스트 케이스를 정한다.

1. AST가 제대로 만들어 지는가?
  - `\$`는 인라인 매스가 아닌 문자열로 파스시킨다.
  - 인라인에서의 `$$\alpha$$`의 경우,
  - 슈퍼 팩토리얼 처리 `$$\$$$`
  - 코드블럭, 인라인 코드안의 매스 블럭/인라인은 무시
2. HTML태그로의 프로퍼티 옵션이 제대로 적용 되는가?
3. 제대로 Katex로 컴파일 되는가?



[remark]: https://github.com/wooorm/remark
[remark-inline-math]: https://github.com/bizen241/remark-inline-math
[wooorm/unified]: https://github.com/wooorm/unified
[remark-math]: https://github.com/Rokt33r/remark-math
[remark-html]: https://github.com/wooorm/remark-html
[katex]: https://github.com/Khan/KaTeX
[mathjax]: https://www.mathjax.org
[standard]: https://github.com/feross/standard
[jest]: https://facebook.github.io/jest/
[rehype]: https://github.com/wooorm/rehype