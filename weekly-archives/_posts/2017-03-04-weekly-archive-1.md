---
layout: post
title: Weekly Archive 1
date: 2017-03-04 22:00:00 +0900
---

## 2017-02-26

### 블로그

주보 의외로 양이 엄청나다. 첫날 이후론 점점 양이 줄어드는 추세였는데, 그래도 일주일 분이 쌓이니 엄청난 듯 하다. 블로그의 개선이 필요할 듯 하다. 일단은 첫 페이지는 최근 글의 미리보기가 아니라 그냥 리스트만 표시해두는게 좋을 것 같다. 그리고 주보는 따로 카테고리화 시켜서 정리해야 할듯 하다.

### 최근 동향

요 몇일간 Cloudflare발의 Cloudbleed나 Git의 SHA-1 해시 충돌, 구글의 엣지 브라우저의 취약성 공개등 묵직한 이슈가 많다. 당장 나랑은 상관없는 일이지만 이런 일련의 사건들이 더욱 안정적인 기술을 만들게 되는 동기라고 믿는다.

그리고, 미 국방성에서 깃허브를 시작하려는 듯 하다.[Code.mil](https://github.com/deptofdefense/code.mil) 어떤 프로젝트를 다룰 지는 모르겠지만, 내 졸업논문에서 사용한 [Datcom](http://www.pdas.com/datcom.html)같은 소프트웨어가 나오지 않을까 싶다.

### Charcoal

본격적으로 시작한다. 먼저 기본적인 블록컨트롤과 작성기능이 필요하다. 그리고 작성기는 당연하지만,

기본적인 룰은 간단하다. 편집기와 프리뷰의 괴리가 없는 마크다운 에디터.

최종적으론 리마크의 모든 옵션을 활용가능하게 하여 어디든 사용 가능하도록 만든다.

### 코드 하이라이트

일단 두가지 옵션이 있다.

#### [Codemirror]

검증된 코드에디터인만큼 기능은 강력하다. 그 대신 확장시 엄청난 러닝코스트를 요구한다.

#### [Lowlight][lowlight]

Wooorm씨가 [Lowlight][lowlight]라는 [highlight.js]를 VDOM으로 재 구현한 물건이다. 상당히 좋아보이긴 하지만 하이라이트용 라이브러리일 뿐이므로 입력기를 따로 구현할 필요가 있다. 그리고, 에디터로 만들었을 때 성능상 어떤 이슈가 있을지 예측하기 어렵다.

대신 스크래치부터 만드는 만큼 완벽한 제어가 가능할듯 하다.

### Content Editible?!

Content Editible을 활용하면 도움이 되지 않을까 싶었는데....
[ContentEditable — The Good, the Bad and the Ugly](https://medium.com/content-uneditable/contenteditable-the-good-the-bad-and-the-ugly-261a38555e9c#.1gdipyrbz)라는 글을 보고 접는게 나을듯하다.

이 글에는 왜 ContentEditable이 그럴듯해보여도 쓰기 어려운지, 그리고, 어떤 어프로치가 유효한지에 대해 나와있다.

- 선택API구현
- 가상 입력기(숨겨진 Textarea, 에뮬레이션된 커서)
- 히스토리 제어
- 네비게이션 제어
- 클립보드 제어

왠지 만들고 나면 코드미러처럼 될 것 같은 느낌이 든다.

Typora의 경우에는 Content Editible을 활용하고 있는데, 클립보드에서 붙여넣기할때 HTML을 마크다운으로 그리고 다시 HTML로 돌려준걸 붙여넣기 하는 듯하다.
그리고 순수한 텍스트는 이 HTML을 파싱하여 돌려주는 듯 하다.

일단 비슷한 어프로치가 가능하긴 할 듯하다.
그 대신 이 경우는 브라우저 문제를 결국 해결하지 못할 것이다.

우선 타이포라의 솔루션에 도전한다. 코드미러의 경우 커서위치를 에뮬레이션 할 뿐아니라 마우스 클릭시 텍스트 선택까지 핸들링해야 하는 만큼 난이도가 너무 높아진다.

우선은 타이포라형식으로 만들고 에디터의 e2e테스트 전략을 세워서 크롬과 사파리에 안정적인 이용이 가능하도록 한다.

## 2017-02-28

### Charcoal

여러가지 방법들을 시도해 보고 있다. 내부적으로 Immutable.js을 활용하여 AST를 관리해보려 했는데 이 경우 `children`이 `Set`으로 처리되고, `Set`의 키는 값을 그대로 쓰기 때문에 내부 요소의 편집시 리액트가 해당 요소를 다시 쓰지 못하고, 새로운 요소를 쑤셔넣게 되어있다.

고로 자식노드를 확실하게 특정할 수 있도록 노드별로 해시를 붙여주어야한다.
그런데 이건 쉬운일이 아닐듯하기도 하다.

일단 이뮤터블은 배제하고 직접 다루는게 가장 적합할 듯하고, 요소들은 인덱스로 다루기가 어려우므로 해시를 뿌려주는게 좋을듯하다.

그리고, 커서등은 역시 전부 에뮬레이트 하는 편이 좋을 듯하다.
단, 블럭별로 렌더해서 코드를 생성해주는식으로하는게 좋을듯

## 2017-03-01

### Charcoal

#### 동시편집성에서의 커서위치 대책

##### 해시

동시편집의 경우 의미의 최소 단위마다 해시키를 부여할 필요가 있다. 이는 타인에의한 편집에 대해 적절한 커서위치를 맞추기 위해 필요하다.

왜냐하면 커서위치를 해시가아니라 행과 열로 표현할 경우 편집 부분을 특정 할 수 없게된다.

간단히 예를 보이면 커서가 `|`에 있다고 하고 여기서 3번째 행을 지워버릴 경우 다음과 같은 현상이 일어난다.

```
1 First
2 Second
3 T|hird
4 Forth
```

```
1 First
2 Second
3 F|orth
4
```

이를 막기 위해서는 행별로 해시가 필요하다. 물론 행별로 편집이 아니라 문자별 편집의 경우 문자마다 해시를 부여할 필요가 있다. 하지만, 일반적으로 한 문장을 동시에 편집하는 씬이 엄청 특이하다. 물론 전문적으로 이걸 미는 앱이면 필요하다.

한국어나 영어의 경우는 스페이스 기준으로 나누어도 괜찮긴 할것이다.

##### Rewindable

또 다른 방법으론 Git이나 SQL처럼 되돌리기가 가능한 완전한 커맨드 시스템을 사용하는 것이다.

이를 택하고 있는 좋은 예는 히어로즈 오브 스톰이나 스타크래프트2의 리플레이이다. 히어로즈 오브 스톰은 더 재밌는게 게임을 도중에 종료한 후 다시 돌아올때도 리플레이처럼 종료시부터 지금시간까지 리와인드를 해나간다.

고로 이를 활용하면 매번 편집기록마다 커서의 이동을 계산 할 수 있으므로 안정적으로 커서를 관리 할 수 있다.

물론 완벽한 해결책은 아니다. 이 방법이 100% 작동하기에는 클라이언트간의 동기화를 요구하므로 오프라인시 작성된 히스토리는 업스트림에서 포크된 라인을 타고가기 때문에 커서위치가 결국은 튕기게 된다.

고로 엄밀하게 말해서 문서툴보다는 실시간게임(히오스, 스타크래프트2)등에 적합하다.

하지만, 실질적인 유저의 수요를 고려할 경우, 오프라인 상황에서 온라인으로 돌아오는 특정순간에 커서의 위치가 안튕기는걸 바라는 사람이 얼마나 될지가 의문이다.

##### 종합

고로, Charcoal은 블록(단락) 단위로 나누고 편집은 커맨드베이스의 리와인더블 가능한 시스템을 채용한다.

이를 사용할 경우 기본 온라인에서의 커서위치에 대한 컨트롤은 문제없을 것이고, 오프라인으로인한 히스토리 포크로부터 돌아올떄의 커서튕김도 최소한 블록단위로는 포커스 유지가 가능할 것이다.

단, 해시의 경우 소스모드에선 해시를 존속시킬 수가 없다. 아마도 소스모드로 편집된 데이터를 Hashed AST로 바꿀때 일종의 `diff`알고리즘을 가지고 블록해시를 찾아주어야 할 것이다.

## 2017-03-02

커서의 에뮬레이션은 난이도는 높고 우선순위는 떨어지는 항목이므로, 블록별 렌더링, 편집하는 형식으로 만든다. Quiver와 비슷하게 될듯.

이후 Charcoal2와 같은 형식으로 커서까지 에뮬레이션된 버젼을 따로 만드는 식으로 하는게 현실적인 니즈에 부합된다고 생각한다.

Typora처럼 만드는 것도 좋아보이지만 궁극적인 해결책이 되지 못하는건 역시 `contentEditable`을 활용한다는 점이다.

### Typora의 추가적인 특징

- 굵게/기울임등을 적용시 기호를 직접 추가하는 형식이기에 유연한 변형이 불가능하다.
- HTML핸들링 : Typora에서 살짝 원래컨샙에 모순되는 움직임을 보인다. `<img>`태그 이외에는 렌더링 상태로 표시하는게 아니라 태그문자열을 계속 표시한다. `*`과 같은 기호는 클릭시에만 표시를 하는데 왜 그런지 잘 모르겠다.
- 소스 모드와의 괴리 : 소스모드는 본 에디터의 편집에의해 Stringify된 값을 계속 받아온다. 고로, 소스 모드에서 편집하고 나갔다가 다시 돌아오면 무의미한 기호는 사라져 있다.

### 목표 재설정

#### 이전까지의 시행착오

대충 지금까지는 4가지 방법을 시도해보았다.

1. React.js를 통한 블록 렌더링
2. 숨겨진 텍스트에어리어 제어 연습
3. 컨텐트 에디터블 제어(리액트 없이 순수한 JS만으로 제어)
4. 컨텐트 에디터블 제어(리액트 활용)

리액트를 통한 렌더링은 좀 귀찮을 뿐이지 어려운 일은 아니다.

숨겨진 텍스트 에어리어의 제어는 앞서말한듯 커서를 에뮬레이션 해야하는데 이건 그렇게 어렵지 않지만 클릭위치로 커서위치를 찾아내는건 난이도가 상당해진다. 렌더링된 문자의 위치를 특정해야 하는건데 글이 단순 모노스페이스드 폰트로 이루어지면 문제 없지만 그렇지 않을 경우는 난이도가 엄청 올라간다. 에이스 에디터의 경우는 이를 해결하고 있지않아서, 무조건 모노스페이스드 폰트를 써야만 한다. 코드미러는 정말로 렌더링된 글자를 읽기때문에 난이도가 엄청나다.

컨텐트 에디터블을 제어하는건 일단 특정 브라우저에 제한을 건다는 전제면 그렇게 어려운건 아닌듯 했다. 단, 만들면서 주로 클립보드를 제어해봤는데, 글은 HTML 그자체로 표현해두는게 가장 유리할 듯 했다. 프리뷰에서 카피된 경우 자연스럽게 클립보드에는 `text/html`가 포함되어있고, 붙여넣기 상황에따라 이를 파싱하여 마크다운 코드로 만들 수도 있기도 하고, 다른 편집기에 붙여넣기 할때도 자연스럽게 HTML상태로 넘겨 줄 수 있다.

3번쨰에서 왠지 컨텐트 에디터블을 블록별로 할당해서 이뮤터블을 활용해 보았는데 또다른 문제를 발견했다. MDAST를 이뮤터블로 집어넣어 관리해보았는데, `Set`의 키가 들어있는 내용물의 값을 직접 사용하고 있었기에 이 키를 React로 설정해버리면 편집시 계속 새로운 엘러먼트라고 인식해서 입력기의 포커스를 잃게되었다. `Set`이 모든 내용물의 키와 값이 동일한건 순수하게 유니크한 값을 가지게 할 수 있기 때문인 것으로, 결국 `Immutable.fromJS`를 통해 이뮤터블 인스턴스 생성시 AST의 `children`에 대해서는 `Set`을 쓰는게 아니라 다른 방법을 강구해야 할 듯 하다.

#### 어떻게 할것인가?

- MDAST를 해시기반 이뮤터블로 만들어서 처리한다. (ImmutableHashedMDAST를 참고)
- 블록단위로 해시를 관리하고 `ul>li>p`같은 계층이 있는 부분까지 커버하기위해 해시는 배열로 관리한다.
- 블록이 선택(Focus)될 경우
- 새로운 단락블록에서 `#`라든가 <code>```</code>를 통해 다른 블록으로 트랜스폼 할 수 있게 해야한다.
- 트랜스폼된 블럭에서 백스페이스를 누를 경우 트랜스폼을 해제하여 단락으로 돌려준다.
- 단, 헤딩의 경우 `#`을 계속 누름으로써 `h6`까지 순차적으로 트랜스폼 시켜주고, 거꾸로 백스페이스로 트랜스폼을 해제할 때도 동일하게 순차적으로 `h1`까지 되돌린 후, 최종적으로 단락을 리턴시킨다.
- 최소한 하나의 단락 블럭는 남아있어야만 한다.
- 기본적으로 입력기는 텍스트에어리어를 사용한다. 나중에 이들을 ContentEditable상태로 라이브프리뷰가 가능하게 만들고, 코드펜스는 [lowlight]를 통해 직접 에디터를 구축하거나 [Codemirror]을 사용하는 방법 둘중 하나가 되겠다. 개인적으론 [lowlight]를 이용하는게 에코시스템상 적절하다고 본다. 아마, 커서가 에뮬레이트 될 시점이면 [lowlight]를 통해 코드에디터까지 만들 수 있을 것이다.
- 키 컨틀롤러의 관리는 코드미러의 관리자를 사용한다.

##### ImmutableHashedMDAST?

`children`의 해시드 맵과 요소의 순서를 보증하는 `Set`을 동시에 제공할 필요가 있다.

어프로치로는 `Map`을 익스텐드시켜서 내부적으로 순서를 보증하는 `Set`을 두고, 순서제어에 필요한 `#splice` 메소드의 추가가 필요하다.(물론 `#pop`이나 `#push`도 필요할 지도 모르지만 `#splice`가 전부 케어가능한 부분이니 정말로 필요하다면 `#splice`로 구현하면 된다.)

물론 `Set`의 요소맵에 해시를 직접 부여할 수도 있지만, 이 경우 이터레이션 코스트와 유니크성에 대해 본질적으로 보장하기 힘들어진다.

그리고, 인라인 요소들은 맵으로 파싱하는게 아니라 전부 그대로

##### Command Manager(History Manager? Time machine?)

모든 액션은 커맨드 베이스로 이루어진다. 그리고 커맨드는 리와인더블 해야한다. 문서별로 SQL처럼 커맨드를 리졸브해서 값을 만드는건 어떨까? 이거 나중을 생각해도 상당히 필요한 것 같다.

### 이름 변경

Charcoal이라는 CMS가 등장하려하는 듯 하다. Wooorm씨에게 제안받아보는 것도 방법인듯

## 2017-03-03

### 스트리밍

어딘가 소통할 수 있는 수단이 필요해서 트위치로 스트리밍을 해보았는데 거의 아무도 보지 않았다. 라이브 스트리밍은 이미 과포화상태이고(특히 게임이) 결국 시작할려면 주변 사람들부터 조금씩 볼 수 있는 컨텐츠를 만들어서 크게 해야할 것 같다.

근데 아직 고립되있는 상태라 처음 내 컨텐츠를 보아줄 사람을 확보하는것부터 어려워보인다.

고로, 당장은 무리해서 스트리밍하는 것 보다 블로그나 코드 결과물 등으로 조금씩 영향력을 넓히는게 맞을 듯 하다.

실망않고 조금씩 조금씩 결과물을 쌓아가다보면 관심을 가져주는 사람도 조금 씩 늘어날 것이다.

### Remark Math

Wooorm씨의 사용방법 제안에 살짝 오류가 있어서 해맸다. `remark-rehype`를 통해 MDAST를 HAST로 바꿔주는데, 이를 `remark-html`로 처리하는 식으로 제안이 작성되어있었다. 혹시 의도된 것인가 싶어서 Gitter로 질문 해 보았는데, 역시 잘못된것이었다. 결국 `rehype-katex`와 `remark-html-katex`를 동시에 만들어 볼 생각이다.

얼른 만들고 이 내용으로 지금까지의 기록을 블로그로 정리하고 싶다.

테스트를 [Unist Builder][unist-builder를 활용한 딥 이퀄로 다시 만들었다. AST에 글의 원래위치인 `position` 값때문에 딥이퀄을 사용하기 곤란했는데, [Remark Parse의 테스트](https://github.com/wooorm/remark/blob/master/test/remark-parse.js#L93)처럼 `position` 값을 꺼버리니 쓰기 편했다. 이전 코드보다 훨씬 깔끔해져서 알기 편해진 듯 하다.

하지만 안타깝게도 Rehype Parse는 `position`을 지우는 옵션을 가지지 않는게 좀 버거운 듯하다. 일단은 이에 대해 `position` 옵션을 받을 수 있도록 [새 PR](https://github.com/wooorm/rehype/pull/7)을 열어 두었다.

## 2017-03-04

### Remark Math

일단 완성후 배포를 하였다. 배포후 알아차린점은 npmjs.com에서의 readme.md가 제대로 불러와지지 않는다는 점이었다. 저장소와 동일한 이름을 가진 `remark-math`는 제대로 저장소 루트의 readme.md를 불러왔지만 그외의 라이브러리는 불러오지 못했기에 추가해 줄 필요가 있는 듯 하다.

그리고 블로그에 Remark Math 개발에 대한 글을 쓸 생각이었는데, 제대로 쓰고싶어서 커버리지까지 한번 신경 써 보았다. 다행히 Jest가 커버리지를 지원해주었는데 리포트도 브라우저로 쉽게 확인 할 수 있어서 편리했다.

[Codemirror]: https://codemirror.net/
[lowlight]: https://github.com/wooorm/lowlight
[highlight.js]: https://highlightjs.org/
[unist-builder]: https://github.com/eush77/unist-builder