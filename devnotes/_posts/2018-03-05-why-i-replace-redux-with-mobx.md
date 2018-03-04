---
layout: post
title: 왜 내가 Redux 대신 MobX를 쓰게 되었느냐.
date: 2018-03-05 00:00:00 +0900
tags: [mobx, redux, typescript]
---

TLDR; 다음과 같은 이유로 개발시 오버헤드가 너무 크다:

1. 기능이 너무 부족하다.
2. 타입스크립트와 너무 안 어울린다.

이전 글에서 이어지는 내용인데, Redux엔 은근 부족한 점이 많다.
> ### Redux 굴기
>
> https://rokt33r.github.io/devnotes/2017/09/10/redux-rises/

# 1. Memoization

Memoization을 적재적소에 활용하는게 어렵다.
`connect`의 `mapToStateProps`는 기본적으로 `memoization`이 포함되어 있지만, 제약이 너무 심하다.
스테이트 전체를 항상 보기 때문에, 지금 컴포넌트와는 상관이 없는 부분이 변경이 되어도 바뀌면 무조건 실행이 되어야한다.
일부 항목에 대해서 Memoization을 이용하려면 Reselect를 활용하면 되긴 하다. 하지만 여전히 오버헤드는 엄청나다. 스테이트에서 어떤 값을 인수로써 기억해야하는지 일일히 한땀한땀 설정을 해주어야한다.

```ts
const mySelector = createSelector(
  state => state.value1, // 한땀
  state => state.value2, // 한땀
  (value1, value2) => value1 + value2
)
```
게다가 Typescript를 쓸 경우, 그만큼 인터페이스와 타입정의가 배로 들어간다.

하지만, MobX의 경우는 기본적으로 지원한다. 게다가 당신이 신경 쓸 필요도 없다. `getter`를 활용해 당신이 필요한 타이밍(컴포넌트가 렌더가 되는 타이밍)에 **느긋하고(lazy) 똑똑하게(smart)** 처리해준다.

```ts
class myState {
    @observable value1 = 0;
    @observable value2 = 0;

    @computed get total() {
        return this.value1 + this.value2
    }
}

@observer
class MyComponent extends React.Component {
  render () {
    return <div>{this.myState.total}</div>
  }
}

ReactDOM.render(<MyComponent myState={myState} />, document.body)
```

`@computed`는 값을 memoization해주고,
`@observer`는 자기가 쓰는 값이 무엇들인지를 알아서 기억해준다.

고로, 각각의 `@observer`가 사용된 컴포넌트들은 자기가 다시 렌더해야될 근원적인 요인이 되는 값들을 자동적으로 추적하게 되므로, `connect`나 reselect에서 하나하나 세세하게 해줬던 작업들이 아예 필요가 없어지게 된다.

> ### `getter` - MDN
>
> https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get

# 2. Multiple mutations

리액트는 모든 액션에 대해 항상 렌더를 시도한다. 하나의 액션만이라도 모든 `connect`로 연결된 컴포넌트의 `mapStateToProps`를 실행시킨다. 이로 인해, 스테이트의 연속적인 변경이 필요한 경우, 많은 일을 하는 액션을 만들 필요가 있는데, 이는 코드의 혼잡도를 엄청나게 올려버린다.

```ts
store.dispatch(setA())
store.dispatch(setB())
store.dispatch(setC())
```
같은 경우 기능이 바뀌어서 setB를 지우려고 하면 코드 한줄만 수정하면 되지만,

```ts
store.dispatch(setAAndBAndC())
```
같은 경우, 새로운 `setAAndB`라는 액션을 만들고, 리듀서 역시 수정이 필요하다.

이를 해결하기 위해 몇가지 라이브러리들이 있지만, redux-saga같은 라이브러리랑 연동이 되는 것도 별로 없고, 타입정의는 커녕 관리도 안되는 라이브러리가 대부분이다.

> 내가 전 회사에서 만들어둔 라이브러리이다. 필요하다면 이걸 참고하면 좋을 듯 하다. https://github.com/Revisolution/typed-redux-kit/tree/master/packages/batch-enhancer

MobX의 경우, `@action` 데코레이터에 뮤테이션 함수를 감싸둠으로써, 최상위 스택의 뮤테이션 함수(가장 먼저 최상단에서 불러진 액션)가 끝날 때 까지 렌더를 시키지 않는다.

# 3. 깊은 스테이트와 불변성

어떤 액션이 깊은 곳에 있는 값을 바꿀 경우, 불변성 유지를 위해 한단계씩 인스턴스를 새로 만들어 줄 필요가 있다.
```ts
const myReducer = (state, action) => ({
  ...state,
  depth1: {
    ...state.depth1,
    depth2: {
      ...state.depth1.depth2,
      depth3: {
        ...state.depth1.depth2.depth3,
        depth4: action.payload
      },
    },
  },
})
```

물론 Immutable.js를 쓰면 조금 낫긴 하지만, 역시 프로퍼티값을 string으로 주고 받아야 하는 점 너무 괴롭다.
`getIn`, `setIn`등의 함수를 쓸 때, 스테이트 트리가 조금만이라도 깊어지면 테스트에 의존하지 않고는 제정신으로 코딩을 할 수가 없다.

`obj.some.where.deep.underground`같은 형태가 있고,
여기에 `where`를 `wheree`로 잘못 입력했다고 생각해보자.
```ts
obj.getIn(['some', 'wheree', 'deep', 'underground'])
undefined
```
이 코드는 아무것도 알려주지 않고 `undefined`를 뱉는다. 런타임에서도 에러가 나지 않는 만큼, 디버깅 경험은 최악에 다다른다. 몇번째 줄에서 문제가 생겼는지, 몇번째 키값이 잘못 입력됬는지를 눈으로 확인해서 고쳐야한다.

```ts
obj.some.wheree.deep.underground
Uncaught TypeError: Cannot read property 'deep' of undefined
```

반면, MobX는 다음과 같이 곧바로 에러를 뱉어버리므로 그럴 여지가 없다. 또한, 키값이 문자열로 되어있지 않은만큼, 타입 추론이 가능하므로 Typescript와 잘어울린다. (`Immutable.Record`도 프로퍼티이름으로 타입추론이 가능 하지만 `getIn`, `setIn`처럼 깊이 가야할 경우, 타입 추론이 불가능하다.)

# 4. 아픈 손가락과 의외로 작지않은 러닝코스트

Redux는 기능을 하나 추가하려면 ActionType과 ActionCreator, 그리고 이걸 다루는 Reducer를 손대어야한다. 여기에 Typescript를 쓸경우, Action에 대한 인터페이스 역시 만들어주어야 하므로 매우 피곤하다.
그리고 `combineReducers`를 쓰려면 **모든 액션 인터페이스**를 모아서 유니언타입으로 만들어주어야 하는데, 이것도 사람 할 짓이 못된다.

```ts
type AllAction = SetAAction | SetBAction | SetCAction | ...
```
말그대로 모든 액션을 다 가져와야하므로 여러 모듈로 분리된 경우 순환의존이 일어나지 않도록 신경쓸 필요까지 생긴다.

그리고 `connect`에서는 `mapStateToProps`, `mapDispatchToProps`, `mergeProps`의 결과값을 인터페이스로 관리해주어야한다. 그리고 이것들은 다 제네릭으로 주고 받으므로, 타입스크립트와 리덕스에 제대로된 이해가 된 사람이 아니고는 컴파일 에러를 통과조차 못할 것이다.

반면, MobX는 처음부터 Typescript로 쓰여있어서, Decorator를 언제 써야하는지만 익숙해지면 매우 심리스하게 개발을 할 수 있다. 어떤 값이 기억되야하는지, 언제 컴포넌트를 다시 렌더링해야하는지를 알아서 통제해주는 만큼, 이걸 직접 구축해야하는 Redux와 비교하면 훨씬 손가락이 안아프고 쉽지 않을까 생각한다.


# 마무리

위의 이유들로 개발중인 앱들을 **MobX로 바꾼 이후, 다시 타입스크립트로 하는 리액트 개발이 즐거워진거 같다.** 확실히 개발에 소요되는 시간이 단축되는게 느껴질 것이다. 만약 당신이 타입스크립트를 쓰고 있고, 나와 비슷한 고통을 받고 있다면 꼭 MobX를 써보길 바란다.

단, 처음 리액트를 사용하는 사람이면 Redux부터 다뤄보길 권한다. 왜 MobX의 자잘한 기능들이 절실한지, 먼저 Redux로 무언가를 만들고 나면 엄청 체감하지 않을까?

# 추신: 그럼 넌 왜 이제서야 쓰냐?

나의 쓸데없는 자존심 때문이었다. Redux가 순수한 함수형 프로그래밍인만큼 라이브러리에 대해 신뢰도가 높고, 고로 내가 통제가능한 코드를 쓸 수 있지 않겠느냐여서다. 처음 MobX를 썻을 때, `componentShouldUpdate`가 작동하지 않는걸 보고, React의 기본적인 라이프사이클에 영향을 주는게 조금 불쾌했던거 같다.
그 이외 자잘한 핑계는 데코레이터 정도일까? Babel의 데코레이터는 아직까지도 스펙대로 개선이 안된채로 계류중에있다. 단, 타입스크립트의 구현은 잘 되어있으므로 더이상 신경 쓸 필요가 없는 듯 하다.
