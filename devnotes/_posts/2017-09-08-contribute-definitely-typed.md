---
layout: post
title: Contribute DefinitelyTyped!
date: 2017-09-08 18:00:00 +0900
tags: [typescript]
---

자바스크립트 라이브러리를 타입스크립트에서도 쓸 수 있도록 타이핑을 정의해보자!

Remark를 타입스크립트에서 활용하기 위한 과정의 일환으로 VFile의 타입 정의를 준비하는 걸 글로 써보았다.

### VFile?

VFile은 Gulp등 파일등을 다루는 라이브러리에서 파일을 추상화 시킨(파일 이름, 위치, 내용들을 가지고 있는 오브젝트) 라이브러리 [Vinyl]와 같은 라이브러리로, 여기서 추가적으로 에러 메세지(린트 에러)를 담을 수 있도록 만들어져 있다.

## 타입 정의 파일을 만들어보자!

타입스크립트는 자바스크립트 코드에 타입을 주입 할 수 있도록 `*.d.ts`라는 파일 형식을 지원하고 있다.

여기에 내부에 타입 정의가 포함되지 않은 라이브러리는 [DefinitelyTyped]에서 커뮤니티에 의해 타입 정의가 만들어 지고 있다.

고로, 내겐 해당 패키지를 수정할 권한이 없더라도 타입정의를 제공하는게 가능하다.

그럼 우선 타이핑부터 만들어본다.

### Define VFile

일반적으로 라이브러리의 사용하는 도중에 긴급하게 타이핑을 추가할 경우에는 `node_modules/@types/$라이브러리명$/index.d.ts` 형식으로 주입을 하지만, 제대로된 타이핑을 만들 경우 직접적으로 테스트 코드에 매칭 시킬 필요가 있다.

고로 [VFile]을 직접 클롭해서 여기서 직접 타입 정의를 매칭시키는게 가장 이상적이다.

```sh
git clone git@github.com:vfile/vfile.git
```

이후, 내부에 index.d.ts를 추가하고, 테스트 파일(`test.js`) 역시 복사해서 `test.ts`로 만들어준다.
또한, `tsconfig.json` 역시 만들어주어 기본적으로 VSCode의 타입체크가 가능하도록 만들어준다.

`tsconfig.json`의 기본적인 타입체킹이 가능하도록만 넣어주면 된다. 나는 이번 타이핑에선 `allowJs`만 주었다.

    {
      "compilerOptions": {
        "allowJs": true
      }
    }

그리고 `test.ts`에서 타입스크립트가 쉽게 알아 볼 수 있도록, `require` 구문을 조금 바꾸어준다.

`test.ts`

```diff
- var test = require('tape');
- var vfile = require('./');
+ import test = require('tape');
+ import vfile = require('./');
```

이제 테스트에서 빨갛게 표시가 된 게 보일 것이다. 이제 정의를 시작하자.

우선 VFile은 CommonJS(이하 CJS) 형식의 모듈이므로 `export = vfile`과 같은 형식으로 다뤄야 할 필요가 있다. 또한, 이 라이브러리는 조금 복잡한 부분이 있으므로, 여러 인터페이스를 준비할 필요가 있다. 고로, 네임스페이스 까지 선언해준다.

```ts
declare namespace vfile {
  interface VFile {
  }
}

declare const vfile: vfile.VFile;

export = vfile;
```

이제 기본적인 vfile에 대한 설정이 완성되었으므로, `test.ts`로 돌아가면 `import vfile = ...`의 빨간줄이 사라지고 밑으로 매우 많은 양의 타입 에러들이 나타나게 된다.

타이핑을 하는 수법에 대해선, 명확하게 `string`이나 `number`로 보이는 것들은(`path`, `dirname` 등...) 바로 추가해준다. 그리고 무언가 완전한 형체는 모르겠지만 오브젝트같아 보이는 것은 전부 인터페이스로 뺴준다.

> 꺼내둔 인터페이스는 구성요소가 보이면 보이는 족족 찾아서 넣어주는게 좋다.

```ts
/// <reference types="node" />

declare namespace vfile {
  interface Point {
      line: number
      column: number
  }

  interface Position {
    start: Point
  }

  interface VFileMessage {
    ruleId: string
  }

  interface VFileParams {
    file: string;
    ruleId: string ;
    reason: string;
    line: number | null;
    column: number | null;
    location: Unist.Position;
    source: string | null;
    fatal?: boolean | null;
  }

  type Message = (reason: string, position?: Point, ruleId?: string) => VFileMessage;

  type Fail = (reason: string, position?: Point, ruleId?: string) => void;

  type Info = (reason: string, position?: Point, ruleId?: string) => void;

  type ToString = (encoding?: BufferEncoding) => string;

  interface VFile {
    (input?: string | Buffer | VFile | VFileParams): VFile;
    message: Message;
    fail: Fail;
    info: Info;
    history: string[];
    data: {};
    messages: VFileMessage[];
    contents: string;
    path: string;
    dirname: string;
    basename: string;
    stem: string;
    extname: string;
    cwd: string;
    toString: ToString;
  }
}

declare const vfile: vfile.VFile;

export = vfile;
```

> `/// <reference types="node" />`는 Node.js에서만 존재하는 `Buffer`와 `BufferEncoding` 타입을 가져오기 위해 필요하다.

이렇게 타이핑을 넣고 다시 `test.ts`를 확인하면 `should set custom props` 이외에는 에러가 없게 된다.

```ts
  t.test('should set custom props', function (st) {
    var testing = [1, 2, 3];
    var file = vfile({custom: true, testing: testing});

    st.equal(file.custom, true);
    st.equal(file.testing, testing);

    st.end();
  });
```

이걸 보면 커스텀한 값을 자유롭게 추가 할 수 있게 의도된 것 같다. 단순하게 한다면 `{[key: string]: any}`를 추가해줄 수 있겠지만, 이러면 타입추론이 불가능해지므로 타입스크립트를 쓰는 이유가 많이 사라지게 된다.

고로, 여기서의 타이핑을 살리기 위해 Generic을 사용한다.

```ts
declare namespace vfile {
  // 생략...
  interface VFileBase<C> {
    (input?: string | Buffer): VFile<C>;
    <C>(input?: string | Buffer | VFile<C> | VFileParams): VFile<C>;
    message: Message;
    fail: Fail;
    info: Info;
    history: string[];
    data: {};
    messages: VFileMessage[];
    contents: string;
    path: string;
    dirname: string;
    basename: string;
    stem: string;
    extname: string;
    cwd: string;
    toString: ToString;
  }

  type VFile<C> = VFileBase<C> & C;
}

declare const vfile: vfile.VFile<{}>;
```

위와 같이 쓸 경우, VFile에 추가 옵션을 넣엇을 때, 그리고 이미 제네릭을 가진 VFile이 새로운 인스턴스를 만들려고 할 때에도 쉽게 이전 제네릭을 계승 시킬 수 있게 된다.

이것으로 테스트코드의 문제는 쉽게 틀어 막을 수 있다. 이제 정말 세세한 것들을 막아주기 위해 문서를 읽으면서 하나씩 해야한다. vfile같은 경우는 `readme.md`에 API의 사용법이 아주 잘 정리되어있어서 이대로 따라하면 된다. 여기선 자잘한 타이핑은 다루지 않겠다. 최종 결과물을 보자!

이제 기본적인 타이핑 준비는 끝났으니, 실제 배포를 준비해보자.

### Fork and Clone!

외부 정의들은 [DefinitelyTyped] 저장소에서 관리된다. 고로, 이걸 수정해서 PR을 주는 형식으로 새로운 정의를 배포 할 수 있다.

우선 깃에서 포크를 하고 다음 명령으로 클론을 해오자.

```sh
git clone --depth=1 git@github.com:$자기계정$/DefinitelyTyped.git
```

> [DefinitelyTyped]는 매우 거대한 저장소이므로 `--depth=1`를 통해 가장 최신 커밋만 가져오는게 효율이 좋다.

열어보면 `types` 디렉토리에 모든게 들어있는 걸 볼 수 있을 것이다. 이제 우리걸 추가해보자.

우선 필요로 하는 파일은 다음과 같다.

-   `index.d.ts`
-   `vfile-tests.ts`
-   `tsconfig.json`
-   `tslint.json`

하지만, 위의 파일들을 직접 만드는건 매우 번거로우므로, [DefinitelyTyped]에서는 [`dts-gen`]을 사용할 것을 권하고 있다.

```sh
# dts-gen 설치
npm i -g dts-gen
# vfile로 파일 생성
dts-gen --dt --name vfile --template module-function
```

이제 `index.d.ts`의 코드를 앞서 만든 정의 코드로 바꿔넣어준다. 단, 가장 위의 코멘트는 다음과 같이 자신의 정보를 추가로 넣어준다.

```ts
// Type definitions for VFile 2.2
// Project: https://github.com/vfile/vfile
// Definitions by: bizen241 <https://github.com/bizen241>
//                 Junyoung Choi <https://github.com/rokt33r>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2
```

> `--template module-function` : dts-gen에선 여러가지 기본 템플레이트를 준비해두고 있다. 여기선 이미 타이핑을 준비해뒀기에 쓰지 않지만, vfile같은 하나의 함수를 제공하는 라이브러리의 경우 `module-function` 템플레이트를 쓰는게 가장 적합하다.

이제 `vfile.tests.ts`를 작업해보자. 여기에 들어가는 테스트는 직접 실행을 하고 결과를 보는게 아니라 타입 추론과 컴파일 에러가 의도대로 일어나는지를 확인하기 위해 사용한다. 고로 여기에서 필요한 코드는 모두 [vfile]의 공식 문서에서 가져올 수 있다.

```ts
const file = vfile({
    path: '~/example.txt',
    contents: 'Alpha *braavo* charlie.',
    custom: 'Custom tango',
    data: {
        custom: 12345
    },
});

file.path; // => '~/example.txt'
file.dirname; // => '~'

file.extname = '.md';

file.basename; // => 'example.md'

file.basename = 'index.text';

file.history; // => ['~/example.txt', '~/example.md', '~/index.text']

file.message('`braavo` is misspelt; did you mean `bravo`?', {line: 1, column: 8});

console.log(file.messages);
```

Definitely Typed 루트 디렉토리에서 다음 명령으로 다시 한번 체크 해보자.

```
npm run lint vfile
```

따로 메세지가 없이 쉘 프롬프트로 돌아오면 테스트에 성공했다는 의미이다.

그럼 타입 에러가 발생해야 할 경우는 어떻게 테스트할까?

Definitely Typed는 의도된 방향대로 유저가 사용해 주지 않을 경우까지 테스트 할 수 있게 해준다. 우선 다음 코드를 추가해보자.

```ts
const invalid = vfile({path: {something: {is: "wrong"}}})
```

이 코드는 `path`에 문자열이 아닌 다른 값을 집어 넣고 있으므로 에러를 내고 있다. 이대로 다시 한번 `npm run lint vfile`을 실행하면 에러가 난다.

자, 그럼 설정을 해보자. 해당 코드 위나 같은 줄에 `$ExpectError`를 코멘트로 추가해준다.

```ts
// $ExpectError
const invalid = vfile({path: {something: {is: "wrong"}}})

// 혹은...
const invalid = vfile({path: {something: {is: "wrong"}}})// $ExpectError
```

이제 테스트를 다시 해보면 정상적으로 타입에러를 확인해주게 된다.

이걸로 준비는 끝이고 직접 PR을 올리면 된다. 내가 작업 한것은 이런식으로 올라가있다.
https://github.com/DefinitelyTyped/DefinitelyTyped/pull/19583

PR을 올리고 원작자와 관련자들을 불러서 같이 리뷰를 하고 하나씩 맞춰나간다. PR은 산더미 같이 많지만, 대체로 하루 이내에 처리되니 부담없이 PR을 만들어주자.

혹시나 머지가 급한 경우는 [DefinitelyTyped]에서도 권고하듯, 앞서 만든 정의 코드를 `node_modules/@types/$패키지 이름$/..`에 직접 넣어서 쓰는 방법도 좋다.

## 정리

1. 기존 코드에 있는 테스트와 문서를 활용해서 타이핑을 만든다.
  - 우선 테스트 코드의 빨간 줄부터 지워나간다.
  - 인터페이스의 모든 값을 다 확인할 필요는 없고, 보이는 족족 추가해준다.
  - 값의 타입을 확인하는 Assertion 테스트의 경우는 무시한다.
  - 문서와 비교해가며 확실하게 검증해나간다.
2. Definitely Typed를 포크하고 dts-gen으로 기본 파일을 생성시킨다.
3. 예제 코드로 타입 테스트 코드를 만든다.
4. 필요에 따라서 반면교사적인 테스트도 추가해준다. `$ExpectError`
5. PR을 작성하고, 원작자에게 리뷰를 요청하여 확실하게 마무리한다.

[vinyl]: https://github.com/gulpjs/vinyl

[vfile]: https://github.com/vfile/vfile

[definitelytyped]: https://github.com/DefinitelyTyped/DefinitelyTyped

[dts-gen]: https://github.com/Microsoft/dts-gen
