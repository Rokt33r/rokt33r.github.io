---
layout: post
title: Monorepo and Lerna
date: 2017-03-09 08:00:00 +0900
tags: [lerna, npm, yarn]
---

Remark Math를 배포하면서 모노리포를 구현하기 위해 [Lerna]를 사용한 노하우를 공유합니다.

# 용어 설명

## 모노리포(Monorepo)?

가령 바벨과 같은 복수의 패키지가 서로 연계되서 활용될 경우, 패키지를 각각의 리포지터리로 만들면 관리하기가 매우 복잡해집니다. 패키지간의 이슈를 처리할 때 매번 리포지터리를 건너다니면서 확인을 해야하고 매번 번거롭게 배포를 따로따로 배포해야하기 때문이죠...

이를 위한 대책중 하나가 모노리포인데, 하나의 리포지터리에 복수의 패키지를 두는 형식입니다. 리액트와 바벨에서 주로 활용되고 있고, Remark Math의 경우도 수식 파서 확장과 렌더러 플러그인을 쉽게 관리하기 위해 하나의 모노리포로 만들었습니다.

> [Why is Babel a monorepo?](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) - Babel

## [Lerna]?

모노리포를 간편하게 관리할 수 있도록 도와주는 CLI 패키지입니다.

Git의 커밋상태를 확인하여 변경된 패키지만 일괄적으로 NPM으로 배포하는 것이 가능하고 동시에 리모트 리포지터리까지 푸시해줍니다. 아직 베타버젼이긴해도 매우매우 편리했어요. :100::100:

<img src="/assets/images/lerna.png" alt="Lerna Logo" width="300">

로고부터 모노리포의 특징을 잘 나타내주고 있네요!

# 사용법

## `lerna init`

우선, Git의 변경점을 통해 패키지를 관리하기 때문에 Git이 초기화 되어져야합니다.

```
git init
```

그리고, Lerna를 글로벌로 설치와 함께 초기화를 합니다.

```
npm i -g lerna
lerna init -i
```

`-i` 플래그는 `--independent`의 얼라이어스로, 각각의 패키지의 버젼을 독립적으로 관리하겠다는 의미입니다. 없이 기본상태로 초기화를 시키면 하나의 버젼으로 모두를 관리합니다.

Babel 역시 독립적으로 관리합니다.

초기화를 마치면 `lerna.json`이 생성됩니다.

```json
{
  "lerna": "2.0.0-beta.38",
  "packages": [
    "packages/*"
  ],
  "version": "independent"
}
```

`lerna`는 lerna가 아직 베타이어서 설정이 언제 바뀔지 모르기에 사용하는 CLI와 설정의 버젼이 항상 동일할 것을 요구하고 있어요.

`packages`는 각각의 패키지들의 위치를 나타냅니다.

`version`은 `-i` 플래그를 넣었기 때문에 `independent`로 설정되어 있습니다. 플래그가 없으면 그냥 버젼이 들어가요.

이제 각각의 패키지는 `packages/some-package`형식으로 넣어주시면 됩니다. 또한, 각각의 패키지마다 `package.json`을 생성해주셔야 해요!

## `lerna bootstrap`

`npm install`을 각각의 패키지에 대해 일괄적으로 돌려줍니다.

루트 디렉토리의 `package.json`에 `postinstall`로 추가해두면 간편하게 사용할 수 있어요.

```
{
  "scripts": {
    "postinstall": "lerna bootstrap"
  }
}
```

## `lerna publish`

`npm publish`를 일괄적으로 실행해 줍니다. 커밋을 확인해서 업데이트가 된 패키지만 배포를 시도합니다.

개인적으로 편리했던건 대화형식으로 간단하게 버젼을 올릴 수 있었던 것이었어요.

```
? Select a new version for remark-math (currently 0.2.0) (Use arrow keys)
❯ Patch (0.2.1)
  Minor (0.3.0)
  Major (1.0.0)
  Custom
```

그리고 안전하게 더블체크까지 해줍니다.

```
Changes:
- rehype-katex: 0.2.0 => 0.2.1
- remark-html-katex: 0.2.0 => 0.2.1
- remark-math: 0.2.0 => 0.2.1

? Are you sure you want to publish the above changes?
```

완료하면 버젼부분을 업데이트하는 커밋과 패키지별로 태그를 생성하고 등록된 리포지터리로 푸시까지 해줘요. 정말 편리해요! :smile:

# 팁 & 주의사항

## 각각의 패키지의 `package.json`에서 `devDependencies`와 `scripts`는 필요없다?

복수의 패키지를 관리하기 쉽게하기위해 만들었기 때문에 개발환경 역시 통합시키는게 관리하기 편하다고 생각해요. 물론 일괄적으로 `npm`명령을 실행시키는 커맨드가 있기는 해요. 대신, 각각의 패키지별로 스크립트를 관리하는건 그다지 모노리포를 사용할 필요가 없는 케이스이지 않을까 싶어요.

고로, 모든 개발에 필요한 스크립트는

## 루트 디렉토리의 `package.json`에선 `dependencies`와 `version`가 필요없다?

루트디렉토리는 퍼블리시를 하지 않는 부분이기 때문에, `dependencies`가 필요 없습니다.

그리고, `version`을 미리 지워두는 것도 상당히 좋은 버릇이라고 생각해요. 실수로 루트 디렉토리에서 `npm publish` 명령을 실행해버려도 `version`이 존재하지 않기 때문에 배포가 원천적으로 불가능 하게 됩니다.

## 배포시 태깅과 TravisCI

엄밀하게 말하면 TravisCI가 나쁜건데.... 배포시 패키지별로 태깅을 하기 때문에 TravisCI가 태그별로 테스트를 반복해서 돌려요..😣 😣 (분명 커밋의 해시가 일치함에도 불구한데도 말이죠...)

![Travis tag handling](/assets/images/travisci-tag-handling.png)

일단은 대처법은 다음과 같이 플래그를 추가시키는 2가지 방법이 있다고 생각합니다.

- `--skip-git` : 이 경우 깃의 조작없이 배포를 합니다. 버전 변경후 직접 커밋/푸시를 해주셔야합니다.
- `-m "[ci skip]"` : 커밋메세지를 덮어써서 CI를 생략시킵니다.

## npmjs.com에서의 readme.md 표시

`npmjs.com`는 루트 디렉토리 `package.json`의 `name`과 동일한 이름의 패키지에 한해서 루트 디렉토리의 `readme.md`를 해당 패키지의 문서로 가져와요. 고로, 다른 패키지들은 다 따로따로 `readme.md`를 만들어 주어야 합니다. 물론, 동일한 이름의 패키지에도 `readme.md`를 만들어 주면 루트디렉토리가 아니라 패키지쪽 문서를 우선해서 표시합니다.

말이 복잡하니 Remark Math의 경우를 보여드릴게요.

```sh
/readme.md # remark-math의 문서
/packages/remark-html-katex/readme.md # remark-html-katex의 문서
/packages/rehype-katex/readme.md # rehype-katex의 문서
```

혹시 여기서 `packages/remark-math/readme.md`를 추가한 경우

```sh
/readme.md # npmjs.com에서는 표시되지 않습니다!
/packages/remark-math/readme.md # remark-math의 문서
/packages/remark-html-katex/readme.md # remark-html-katex의 문서
/packages/rehype-katex/readme.md # rehype-katex의 문서
```

## `npm` 대신 `yarn`

[`2.0.0-beta.38`](https://github.com/lerna/lerna/releases/tag/v2.0.0-beta.38) 버젼 부터 `lerna.json`에 다음과 같이 설정을 하면 쓸 수 있습니다.

```json
  "npmClient": "yarn"
```

> `yarn.lock`은 `.gitignore`에 추가하는 걸로 감출 수 있는 듯 합니다.
>
> ```
> packages/*/yarn.lock
> ```

# 잡담

원래 Remark Math을 만들면서 배운점들을 정리하는 포스트를 작성하려고 했는데 Lerna에 대해서만 작성하게 되었네요. 제가 글을 쓰는데 아직 덜 익숙한 것도 있고... 여튼 부족한 글 읽어주셔서 감사합니다.

그리고 제가 일본서 5년간 체류하다 저번주 귀국해서 한국 친구가 별로 없네요... 혹시 React나 Node.js 그리고 Electron에 흥미있으신분은 [https://gitter.im/rokt33r/Lobby](https://gitter.im/rokt33r/Lobby)로 오세요! 같이 수다나 떨어요. :grin:

[Lerna]: https://github.com/lerna/lerna
