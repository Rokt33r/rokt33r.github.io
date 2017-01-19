---
layout: post
title: Babel 플러그인을 맛보다!
tags: [babel, webpack, react]
---

개인적으로 [리액트 공식 튜토리얼의 방식](https://facebook.github.io/react/docs/handling-events.html)이 마음에 들지않았어요.
그래서 컨스트럭터에 애로우펑션을 넣어서 따로 바인드 없이 쓰는 방식을 시도해보았는데 작동은 하지만 React Hot Loader 3(이하 RHL3)가 제대로 움직이지 않더라고요.

```js
class LoggingButton extends React.Component {
  constructor (props) {
    super(props)
    // 이렇게 !!
    this.handleClick = () => {
      console.log('this is:', this);
    }
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

그래서 [이슈](https://github.com/gaearon/react-hot-loader/issues/427)를 등록했는데 아무래도 메인테이너분들이 다른 일로 바쁘셔서 대응이 안되는듯 하셨어요. 그나마 다행인건 어디를 보면 다룰 수 있는지는 알려주셨어요. 물고기를 주는 대신 물고기를 잡는법을 알려주는 것처럼! :fishing_pole_and_fish::fishing_pole_and_fish::fishing_pole_and_fish:

## 참고자료

다음 3개의 링크가 제가 받은 부분입니다.

- [바벨 핸드북](https://github.com/thejameskyle/babel-handbook)
- [AST Explorer](https://astexplorer.net/)
- [Babel types](https://github.com/babel/babel/tree/master/packages/babel-types)

바벨핸드북은 바벨 사용법은 한글화 되어있는데 플러그인은 아직 한글화 되어있지 않았어요. 뭐 딱히 안보셔도 괜찬아요. 엄청 길기도하고 이 포스트도 간단하게 바벨이 어떻게 코드를 트랜스파일하는지 가볍게 맛만보는걸 목표로 하니까요. :smile:

하지만, AST Explorer는 꼭 써보셔야 합니다!

AST는 정말 복잡하기 때문에 이게없으면 뭐가 어디있는지 파악하기 정말 어려워져요. 물론 익숙해지면 필요없겠지만 처음다루시면 꼭 여기에 예제코드 넣어보세요!
넣고 커서를 움직이면 지금 선택한 부분이 어떻게 파싱되어있는지 간단히 알 수 있습니다!

![AST Explorer](/assets/images/ast-explorer.png)

> 바빌론 버젼별로 약간 타입이름이 다르므로 꼭 **바빌론6**를 선택해주세요!

Babel Types 역시 플러그인 편집할땐 존재하는 모든 신택스 노드가 정리되어있기 때문에 사전처럼 계속 보셔야합니다.
이 모듈은 일종의 헬퍼로서 간단히 신택스 노드를 생성하거나 노드에 대한 테스트가 가능합니다.

## 코드

이게 제가 쓴 코드의 PR입니다! [#464](https://github.com/gaearon/react-hot-loader/pull/464/files)

먼저 목표확인을 위해 테스트 코드부터 봅시다. 테스트는 필스쳐로 컴파일 전 코드와 컴파일된 후의 코드를 두고 이 픽스쳐들을 `fs.readdir`로 불러 일괄처리하는 형식이었습니다.

먼저 컴파일 전 코드입니다.

```js
class Foo {
  constructor() {
    this.onClick = (e) => e.target.value
  }
}
```

컴파일 된 후의 코드입니다. 고로 우리는 위의 코드를 밑으로 바꿔써주는 트랜스파일러를 만들면 됩니다.

컨스트럭터는 처음 마운트 될때만 실행되고, 리로드시에는 클래스 메소드의 리로드만 일어나기 때문에, 컨스트럭터내부의 메소드를 바깥으로 꺼내주고 안에서는 꺼낸 코드를 부르도록 함으로서, 리로드시 컨스트럭터가 다시 한번 바인드 할 필요없이 새롭게 리로드된 메소드를 재사용 할 수 있게됩니다.

```js
class Foo {
  constructor() {
    this.onClick = (...params) => this.__onClick__REACT_HOT_LOADER__(...params);
  }

  __onClick__REACT_HOT_LOADER__(e) {
    return e.target.value;
  }

}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Foo, "Foo", __FILENAME__);
}();

;
```

자 그럼 트랜스파일러 플러그인을 본격적으로 보기전에 간단한 설명부터 드리겠습니다. AST는 코드를 파스하여 JSON 트리와 같은 구문트리를 만들어줍니다. 여기서 우리는 어떤 패턴(컨스트럭터안에서의 애로우펑션)을 찾아서 웹팩이 대응가능한 형식으로 만들어 주어야합니다.

이에 바벨은 Visitor(이하 방문자)라는 개념이 있어 이를 활용하면 노드 하나씩 자식 노드를 확인해가며 깊숙한 곳 구석구석까지 점검해줍니다. 고로 `if`문등 각종 블록으로 코드의 깊이가 제각각 일 경우가 많으므로 직접적 이터레이팅을 하는 것 보다 방문자를 활용하는게 적합합니다.

그리고 또다른 특징으로 방문자가 해당 노드를 찾았을 때 돌려주는건 노드 자체의 인스턴스가 아니라 `path`라는(Node.js의 `path`가 아닙니다.) 형식으로 감싸서 줍니다. jQuery와 조금 비슷한 느낌이긴한데 트랜스파일링을 위한 몇가지 헬퍼와 트리내 색인기능을 제공해줍니다.

```js
// 컨스트럭터에 선언된 애로우 펑션을 같은 형식으로 트랜스파일을 했을 때,
// 방문자는 이를 인식못하고 다시 한번 트랜스파일을 하여 무한히 트랜스파일을 하는 현상이 생깁니다.
// 고로 심볼을 활용하여 한번 트랜스파일한 부분에는 심볼로 표시를 해두어 다시 한번 트랜스파일한 부분은 무시하게 합니다.
// 헨젤과 그레텔의 빵가루같은 존재이죠! 🍞🍞
const replaced = Symbol('replaced');

// 생략

// 교체될 메소드를 만들어주는 함수입니다. 중간에 코드가 생략되었는데 t는 Babel types입니다.
const buildNewAssignmentExpression = (t, classPropertyName, newMethodName, isAsync) => {
  let returnExpression = t.callExpression(
    t.memberExpression(t.thisExpression(), newMethodName),
    [t.spreadElement(t.identifier('params'))]
  );

  if (isAsync) {
    returnExpression = t.awaitExpression(returnExpression);
  }

  const newArrowFunction = t.arrowFunctionExpression(
    [t.restElement(t.identifier('params'))],
    returnExpression,
    isAsync
  );
  const left = t.memberExpression(t.thisExpression(), t.identifier(classPropertyName.name));

  const replacement = t.assignmentExpression('=', left, newArrowFunction);
  replacement[replaced] = true;

  return replacement;
};

// 생략

module.exports = function plugin(args) {
  return {
    visitor: {

      // 생략

      // 매번 클래스에 방문할 때마다 이 함수가 쓰여집니다.
      Class(classPath) {
        // 패스 내부 색인은 `get` 메소드를 사용합니다.
        const classBody = classPath.get('body');

        classBody.get('body').forEach(path => {
          if (path.isClassProperty()) {
            // 생략
          } else {
            // 바디를 이터레이트시켜 컨스트럭터를 찾습니다. 앞서 만든 심볼을 활용해 이미 트랜스파일된 메소드는 무시합니다.
            if (!path.node[replaced] && path.node.kind === 'constructor') {
              // 트래버스는 Path내에서 다시한번 방문자를 사용할 수 있게 해줍니다. 저는 컨스트럭터안의 애로우 펑션이 대입되는 구문을 찾기위해 사용합니다.
              path.traverse({
                AssignmentExpression(exp) {
                  // 이미 트랜스파일 되었나, this에 바인드되었나 등등을 처리해줍니다.
                  if (!exp.node[replaced]
                    && exp.node.left.type === 'MemberExpression'
                    && exp.node.left.object.type === 'ThisExpression'
                    && exp.node.right.type === 'ArrowFunctionExpression'
                  ) {
                    const key = exp.node.left.property;
                    const node = exp.node.right;

                    const isAsync = node.async;
                    const params = node.params;
                    const newIdentifier = t.identifier(`__${key.name}__REACT_HOT_LOADER__`);

                    const newMethodBody = node.body.type === 'BlockStatement' ?
                      node.body :
                      t.blockStatement([t.returnStatement(node.body)]);

                    const newMethod = t.classMethod('method', newIdentifier, params, newMethodBody);
                    newMethod.async = isAsync;
                    newMethod[replaced] = true;
                    // 클래스메소드로 새롭게 만들어 바깥으로 꺼내줍니다.
                    path.insertAfter(newMethod);

                    // 컨스트럭터안의 메소드는 바깥으로 꺼낸 메소드를 부르게 합니다.
                    exp
                      .replaceWith(buildNewAssignmentExpression(t, key, newIdentifier, isAsync));
                  }
                },
              });
            }
          }
        });
      },
    },
  };
};
```

이상입니다. 바벨의 파싱원리는 아직 저도 잘 모르겠지만, 이번 기회로 이미 파싱된 AST를 트랜스파일하는건 그렇게 어렵지 않아진 느낌이 듭니다. :sunglasses::sunglasses:
