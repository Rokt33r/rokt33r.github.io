---
layout: post
title: Redux 굴기(崛起)
date: 2017-09-10 12:00:00 +0900
tags: [redux, typescript]
---

Redux 사용에 있어서 아쉬웠던 점들과 그걸 고쳐나간 경험을 써보려 한다.
(솔직히, Redux는 MobX에 비해 부족한 점이 많다.)

리덕스는 다음과 같은 문제가 있다.

1. Memoization이 안된다.
2. 비효율적인 리듀싱
  - 액션마다 렌더를 다시 시킨다.(Batched actions 처리에 불리)
  - 모든 리듀서에 액션을 넘겨준다.(combineReducers)
3. 깊은 구조를 다루기 힘들다.

하나씩 까엎어보자.

## Memoization

Redux는 스테이트에 변경이 일어나면 모든 연결된(`connect`) 컴포넌트들에게 새로운 스테이트를
전달해준다. 여기서, 스테이트의 일부에 이터레이션이나(배열이나 맵의 정렬, 필터) 계산이 있을 경우, 각각의
컴포넌트들은 자신이 필요로 하는 부분은 변경이 없음에도 불구하고 다시 계산을 해야한다.

여기서 Memoization은 이전에 받은 인수들과 리턴 값을 기억해두어, 새로 받은 인수가 이전과 동일 할 경우,
기억해둔 리턴값을 그대로 돌려주게 만들어져있다.

직접 만들기 어려운건 아니지만, [Reselect]를 사용하면 좀 더 강력하게 Memoization을 사용할 수 있다.

Reselect는 2개의 단계로 Redux의 스테이트로부터 계산식에 필요한 인수를 구하는 함수들과,
이 인수들로 결과값을 만드는 계산 함수로 되어있다.

고로 값이 변경되어 State의 인스턴스가 새로 만들어져도, 인수로 필요로 하는 값이 아직 변경이 안됬으면
이전 결과값을 바로 재활용 할 수 있다.

```js
import { createSelector } from 'reselect'

// 스테이트에서 어떤 값을 인수로 쓸지 찾아주는 함수들이다.
const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  // 찾아진 인수에 대해 계산을 행한다.
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

## Batched Actions

연속적인 액션 디스패치시, 리덕스는 매 디스패치마다 연결된 컴포넌트에게 새 스테이트를 전달해준다.
스테이트가 안바뀐다면, `mapStateToProps`를 두드리진 않겠지만, 매 디스패치마다 스테이트가 바뀌고 앞서
설명한 Memoization이 제대로 안되어있으면 앱은 엄청나게 느려질 것이다.

물론 대책은 `디스패치를 자주 안하면 된다.` 라는 방법이 있다. 이는 작은 액션을 여러개 디스패치하는걸
삼가고, 아주 강력한 하나의 액션을 소수 만들면 된다. 문제는 여기서 시작된다. 이렇게 만든 액션이 관리하기
쉬운 코드일까? 함수를 만들 때도 작은 일을 확실하게 하는 녀석들을 많이 만들어야 테스트도 쉽고, 재사용성도
높아지고 이해하기도 쉬워진다. 고로, 개발 경험을 높이기 위해서는 작고 하나의 일을 확실히 해내는 액션을
많이 가지는게 이롭다.

고로, 우리는 일련의 액션에 대해 리듀싱을 모두 다 끝내주고 컴포넌트들에게 넘겨 줄 필요가 있다.

이를 해결하기 위해 몇가지의 작은 기존 라이브러리가 있는데, 사용성이 별로 마음에 안들고, Redux Saga에
제대로 대응하지도 않는게 대부분이었다.

그래서, 새롭게 [Batch Enhancer]를 만들었다.

```ts
const sagaMiddleware = createSagaMiddleware()
const middlewareEnhancer = applyMiddleware(sampleMiddleware)
const enhancer = compose<Redux.StoreEnhancerStoreCreator<State>>(
  middlewareEnhancer,
  batchEnhancer(sagaMiddleware),
  // Saga를 쓰지 않는다면, 미들웨어를 넘겨주지 않아도 된다.
  // batchEnhancer(),
)
// 적용은 가볍게 인핸서만 넣어주면 된다.
const store = createStore(reducer, enhancer)

// 이제 배열로 디스패치가 가능하다.
store.dispatch([
  {
    type: 'SayHello',
  },
  {
    type: 'SayHello',
  },
  {
    type: 'SayHello',
  },
])

// `put` 이펙트에서도 똑같이 쓸 수 있다.
function * saga () {
  while (true) {
    yield take('SayHello')
    yield put([
      {
        type: 'SayBye',
      },
      {
        type: 'SayBye',
      },
      {
        type: 'SayBye',
      },
    ])
  }
}
```

이제, 배열에 담긴 액션들을 다 리듀스하고나서 컴포넌트들에겐 최종적인 결과물만 알려주게 된다.

## Efficient reducing with Map

또 다른 문제로, `combineReducers`과 `switch` 구문이 별로 마음에 안들었다. 처음 쓰기엔 쉽지만,
앱이 커질수록 매 액션들을 모든 스위치 구문으로 통과시키는건 너무 비효율 적인듯 해보였다.

이에, [Mapped Reducer]를 만들었는데, 액션 타입을 키로 그에 맞춰 스테이트를 변경하는 함수를 값으로
가지는 맵을 만들었다. 이벤트 리스너랑 비슷해진 느낌인데, 기능상으론 combineReducers와 크게 다른건 없다.

장점은 액션에 대해 특정 리듀서만 작동 시킬 수 있다는 점이고, Map을 활용했기에 액션 수가 많아질 수록
Switch보다 인덱싱에서 유리한 고지를 점할 수 있다.(Map은 키를 해시값으로 다룬다.)

```ts
import { createStore } from 'redux'
import { MappedPipeReducer } from 'typed-redux-kit.mapped-reducer'
import {
  PureAction,
  PayloadAction,
} from 'typed-redux-kit.base'

enum ActionTypes {
  Plus = 'test_Plus',
  Set = 'test_Set',
}

namespace Actions {
  export interface Plus extends PureAction<ActionTypes.Plus> {}

  export interface Set extends PayloadAction<ActionTypes.Set, {
    count: number
  }> {}
}

interface State {
  count: number
}

const plusReducer = (state: State, action: Actions.PlusAction) => ({
  ...state,
  count: state.count + 1,
})

const setReducer = (state: State, action: Actions.SetAction) => ({
  ...state,
  ...action.payload,
})

// 초기 스테이트는 스토어에 넣어줘도 된다.
const reducer = new MappedPipeReducer<State>({
  initialState: {
    count: 0,
  },
})

reducer
  .set(ActionTypes.Plus, plusReducer)
  .set(ActionTypes.Set, setReducer)
  // 복수의 액션타입에 대해서도 간단히 배열로 넣어줄 수 있다.
  .set([
    ActionTypes.Plus,
    ActionTypes.Set,
  ], anotherReducer)
  // String enum도 따로 변환없이 바로 넣어줄 수 있다.
  .set(ActionTypes, yetAnotherReducer)

const store = createStore(reducer.reduce)
store.dispatch({
  type: ActionTypes.Plus,
} as Actions.Plus)
```

## Deep state

Redux에선 깊은 데이터 구조를 다루기 매우 귀찮다. 이는 변경 사항을 항상 Immutable한 상태로 유지해야하기 떄문인데, 그냥 오브젝트로 깊은 곳에 있는 값을 수정하려 할경우 다음과 같이 된다:

```ts
const myReducer = (state, action) => ({
  ...state,
  depth1: {
    ...state.depth1,
    depth2: {
      ...state.depth2,
      depth3: {
        ...state.depth3,
        depth4: action.payload
      },
    },
  },
})
```

콜백헬 처럼 피라미드가 되어가...

이에 페이스북이 만든 Immutable.js는 더 나은 API로 이를 쉽게 다루게 해준다.

```ts
const myReducer = (state, action) => (
  state.setIn(['depth1', 'depth2', 'depth3', 'depth4'], action.payload)
)
```

근데, 문제점은... `getIn`, `setIn`, `...In`과 같은 메소드는 문자열의 배열로 키들을 가져와서 값을
찾아 내도록 만들어져 있으므로, 타입 추론이 불가능하다는 것이므로, 키값을 잘못넣으면 런타임까지 가야 에러를
찾을 수 있기 때문에, 항상 테스트를 할 필요가 있다.

이를 타입스크립트로 틀어막기위해선 `...In`을 쓰면 안되는데, 그러면...:

```ts
const myReducer = (state, action) => (
  state
    .update('depth1', depth1 => depth1
      .update('depth2', depth2 => depth2
        .update('depth3', depth3 => depth3
          .update('depth4', depth4 => action.payload)
        )
      )
    )
)
```

또 다른 피라미드가 생긴다.

이에 해결책을 고민하다 MobX의 Observable Object를 보고 영감을 받아 [Trackable]을 만들었다.

Trackable은 말그대로 추적을 해주는 데이터 구조체로 값이 변경되면 흔적을 남겨두고 마지막으로 리듀서에서
나갈 때 변경된 부분만 새로운 인스턴스로 만들어주면 준다.

```ts
import * as Redux from 'redux'
import {
  trackEnhancer,
  TrackableRecord,
} from '../lib'

const CountRecord = TrackableRecord({
  count: 0,
})
type CountRecord = TrackableRecord<{
  count: number
}>
type State = TrackableMap<string, CountRecord>
const defaultChildState = CountRecord({
  count: 0,
})
const defaultState: State = new TrackableMap({
  a: defaultChildState,
})

const myReducer = (state: State = defaultState, action: Redux.Action) => {
  if (action.type === 'add') {
    // 이제 불변성 신경안쓰고 신나게 바꿔도 된다!
    state.get('a').count++
  }
  return state
}
// 왜냐하면 `trackEnhancer`가 변경을 추적해서 더러워진(변경된) 부분을 깔끔하게 해주기 때문에!
const store = Redux.createStore(myReducer, trackEnhancer)

store.dispatch({
  type: 'add',
})

const reducedState = store.getState()
expect(reducedState.get('a').count).toBe(1)
// 고로 변경은 뮤터블하게 했지만 결과의 인스턴스는 바뀌어있다.
expect(reducedState).not.toBe(defaultState)
```

주의할 점은 Object나 Map, Array를 모두 Trackable로 관리해야한다. (예제엔 없지만 배열을 위해
`TrackableArray` 역시 준비되어 있다.)

그리고 Immutable.js보다 조금 성능상 모자란 부분이 있는데, Immutable.js는 HAMT를 사용하여
새 인스턴스를 더욱 효율적으로 만들 수 있다. 하지만 Trackable은 아직 단순히 1차원적으로 키과 값의
이터레이션으로 새 인스턴스를 만들고 있으므로, 혹시 수평적으로 엄청 거대한 맵을 만들려고 할 때에는 보틀넥이
될것이다. 아마 이번달 중으로 작업할 것이므로 조금만 더 기다려줬으면 한다. (혹은 수직적으로 더 깊은 구조를
만들어 카테고리화 시키는 것도 한가지 방법이다.)

앞으로 할 건 HAMT와 Set 구조를 더 추가할 계획이다.

## 마무리

리덕스에서 느껴지는 여러가지 문제점들을 하나씩 태클해 보았다. 덕분에 타입스크립트를 좀 더 잘 다룰 수 있게
되는 등 배운게 많은 거 같다.

단, 아직까지 리덕스에서 아쉽다고 느껴지는 점은 언제나 코드가 너무 장황해진다는 것이다.

어쩌면 CLI같은걸 만들어서 해결할 수 있지 않을까 라는 상상도 하는데 일단은 좀 더 유즈케이스를 늘려서
힌트를 찾으러 다녀야겠다.

[reselect]:(https://github.com/reactjs/reselect)
[batch enhancer]:(https://github.com/Revisolution/typed-redux-kit/blob/master/packages/batch-enhancer/readme.md)
[mapped reducer]:(https://github.com/Revisolution/typed-redux-kit/blob/master/packages/mapped-reducer/readme.md)
[trackable]:(https://github.com/Revisolution/typed-redux-kit/blob/master/packages/trackable/readme.md)
