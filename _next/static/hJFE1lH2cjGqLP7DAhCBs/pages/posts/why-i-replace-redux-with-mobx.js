(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{MpHe:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/why-i-replace-redux-with-mobx",function(){var e=a("fcdY");return{page:e.default||e}}])},fcdY:function(e,t,a){"use strict";a.r(t),a.d(t,"filePathname",function(){return l}),a.d(t,"frontMatter",function(){return o}),a.d(t,"default",function(){return m});var n=a("kOwS"),c=a("qNsG"),b=a("q1tI"),p=a.n(b),s=a("E/Ix"),l=(p.a.createElement,"/pages/posts/why-i-replace-redux-with-mobx.md"),o={icon:"\ud83d\ude25",title:"\uc65c \ub0b4\uac00 Redux \ub300\uc2e0 MobX\ub97c \uc4f0\uac8c \ub418\uc5c8\ub098",date:new Date("2018-03-05T00:00:00.000Z"),tags:["mobx","redux","typescript"],category:"dev-kor"},r={filePathname:l,frontMatter:o},j="wrapper";function m(e){var t=e.components,a=Object(c.a)(e,["components"]);return Object(s.b)(j,Object(n.a)({},r,a,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,"TLDR; \ub2e4\uc74c\uacfc \uac19\uc740 \uc774\uc720\ub85c \uac1c\ubc1c\uc2dc \uc624\ubc84\ud5e4\ub4dc\uac00 \ub108\ubb34 \ud06c\ub2e4:"),Object(s.b)("ol",null,Object(s.b)("li",{parentName:"ol"},"\uae30\ub2a5\uc774 \ub108\ubb34 \ubd80\uc871\ud558\ub2e4."),Object(s.b)("li",{parentName:"ol"},"\ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\uc640 \ub108\ubb34 \uc548 \uc5b4\uc6b8\ub9b0\ub2e4.")),Object(s.b)("p",null,"\uc774\uc804 \uae00\uc5d0\uc11c \uc774\uc5b4\uc9c0\ub294 \ub0b4\uc6a9\uc778\ub370, Redux\uc5d4 \uc740\uadfc \ubd80\uc871\ud55c \uc810\uc774 \ub9ce\ub2e4."),Object(s.b)("blockquote",null,Object(s.b)("h3",{parentName:"blockquote"},"Redux \uad74\uae30"),Object(s.b)("p",{parentName:"blockquote"},Object(s.b)("a",Object(n.a)({parentName:"p"},{href:"https://rokt33r.github.io/devnotes/2017/09/10/redux-rises/"}),"https://rokt33r.github.io/devnotes/2017/09/10/redux-rises/"))),Object(s.b)("h1",null,"1. Memoization"),Object(s.b)("p",null,"Memoization\uc744 \uc801\uc7ac\uc801\uc18c\uc5d0 \ud65c\uc6a9\ud558\ub294\uac8c \uc5b4\ub835\ub2e4.\n",Object(s.b)("inlineCode",{parentName:"p"},"connect"),"\uc758 ",Object(s.b)("inlineCode",{parentName:"p"},"mapToStateProps"),"\ub294 \uae30\ubcf8\uc801\uc73c\ub85c ",Object(s.b)("inlineCode",{parentName:"p"},"memoization"),"\uc774 \ud3ec\ud568\ub418\uc5b4 \uc788\uc9c0\ub9cc, \uc81c\uc57d\uc774 \ub108\ubb34 \uc2ec\ud558\ub2e4.\n\uc2a4\ud14c\uc774\ud2b8 \uc804\uccb4\ub97c \ud56d\uc0c1 \ubcf4\uae30 \ub54c\ubb38\uc5d0, \uc9c0\uae08 \ucef4\ud3ec\ub10c\ud2b8\uc640\ub294 \uc0c1\uad00\uc774 \uc5c6\ub294 \ubd80\ubd84\uc774 \ubcc0\uacbd\uc774 \ub418\uc5b4\ub3c4 \ubc14\ub00c\uba74 \ubb34\uc870\uac74 \uc2e4\ud589\uc774 \ub418\uc5b4\uc57c\ud55c\ub2e4.\n\uc77c\ubd80 \ud56d\ubaa9\uc5d0 \ub300\ud574\uc11c Memoization\uc744 \uc774\uc6a9\ud558\ub824\uba74 Reselect\ub97c \ud65c\uc6a9\ud558\uba74 \ub418\uae34 \ud558\ub2e4. \ud558\uc9c0\ub9cc \uc5ec\uc804\ud788 \uc624\ubc84\ud5e4\ub4dc\ub294 \uc5c4\uccad\ub098\ub2e4. \uc2a4\ud14c\uc774\ud2b8\uc5d0\uc11c \uc5b4\ub5a4 \uac12\uc744 \uc778\uc218\ub85c\uc368 \uae30\uc5b5\ud574\uc57c\ud558\ub294\uc9c0 \uc77c\uc77c\ud788 \ud55c\ub540\ud55c\ub540 \uc124\uc815\uc744 \ud574\uc8fc\uc5b4\uc57c\ud55c\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"const")," mySelector = createSelector(\n  ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-function"}),Object(s.b)("span",Object(n.a)({parentName:"span"},{className:"hljs-params"}),"state")," =>")," state.value1, ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-comment"}),"// \ud55c\ub540"),"\n  state => state.value2, ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-comment"}),"// \ud55c\ub540"),"\n  (value1, value2) => value1 + value2\n)\n")),Object(s.b)("p",null,"\uac8c\ub2e4\uac00 Typescript\ub97c \uc4f8 \uacbd\uc6b0, \uadf8\ub9cc\ud07c \uc778\ud130\ud398\uc774\uc2a4\uc640 \ud0c0\uc785\uc815\uc758\uac00 \ubc30\ub85c \ub4e4\uc5b4\uac04\ub2e4."),Object(s.b)("p",null,"\ud558\uc9c0\ub9cc, MobX\uc758 \uacbd\uc6b0\ub294 \uae30\ubcf8\uc801\uc73c\ub85c \uc9c0\uc6d0\ud55c\ub2e4. \uac8c\ub2e4\uac00 \ub2f9\uc2e0\uc774 \uc2e0\uacbd \uc4f8 \ud544\uc694\ub3c4 \uc5c6\ub2e4. ",Object(s.b)("inlineCode",{parentName:"p"},"getter"),"\ub97c \ud65c\uc6a9\ud574 \ub2f9\uc2e0\uc774 \ud544\uc694\ud55c \ud0c0\uc774\ubc0d(\ucef4\ud3ec\ub10c\ud2b8\uac00 \ub80c\ub354\uac00 \ub418\ub294 \ud0c0\uc774\ubc0d)\uc5d0 ",Object(s.b)("strong",{parentName:"p"},"\ub290\uae0b\ud558\uace0(lazy) \ub611\ub611\ud558\uac8c(smart)")," \ucc98\ub9ac\ud574\uc900\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"class")," myState {\n    ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-meta"}),"@observable")," value1 = ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-number"}),"0"),";\n    ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-meta"}),"@observable")," value2 = ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-number"}),"0"),";\n\n    ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-meta"}),"@computed")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"get")," total() {\n        ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"return")," ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"this"),".value1 + ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"this"),".value2\n    }\n}\n\n",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-meta"}),"@observer"),"\n",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"class")," MyComponent ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"extends")," React.Component {\n  render () {\n    ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"return")," <div>{",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"this"),".props.myState.total}<",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-regexp"}),"/div>\n  }\n}\n\nReactDOM.render(<MyComponent myState={myState} /"),">, ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-built_in"}),"document"),".body)\n")),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"@computed"),"\ub294 \uac12\uc744 memoization\ud574\uc8fc\uace0,\n",Object(s.b)("inlineCode",{parentName:"p"},"@observer"),"\ub294 \uc790\uae30\uac00 \uc4f0\ub294 \uac12\uc774 \ubb34\uc5c7\ub4e4\uc778\uc9c0\ub97c \uc54c\uc544\uc11c \uae30\uc5b5\ud574\uc900\ub2e4."),Object(s.b)("p",null,"\uace0\ub85c, \uac01\uac01\uc758 ",Object(s.b)("inlineCode",{parentName:"p"},"@observer"),"\uac00 \uc0ac\uc6a9\ub41c \ucef4\ud3ec\ub10c\ud2b8\ub4e4\uc740 \uc790\uae30\uac00 \ub2e4\uc2dc \ub80c\ub354\ud574\uc57c\ub420 \uadfc\uc6d0\uc801\uc778 \uc694\uc778\uc774 \ub418\ub294 \uac12\ub4e4\uc744 \uc790\ub3d9\uc801\uc73c\ub85c \ucd94\uc801\ud558\uac8c \ub418\ubbc0\ub85c, ",Object(s.b)("inlineCode",{parentName:"p"},"connect"),"\ub098 reselect\uc5d0\uc11c \ud558\ub098\ud558\ub098 \uc138\uc138\ud558\uac8c \ud574\uc92c\ub358 \uc791\uc5c5\ub4e4\uc774 \uc544\uc608 \ud544\uc694\uac00 \uc5c6\uc5b4\uc9c0\uac8c \ub41c\ub2e4."),Object(s.b)("blockquote",null,Object(s.b)("h3",{parentName:"blockquote"},Object(s.b)("inlineCode",{parentName:"h3"},"getter")," - MDN"),Object(s.b)("p",{parentName:"blockquote"},Object(s.b)("a",Object(n.a)({parentName:"p"},{href:"https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get"}),"https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get"))),Object(s.b)("h1",null,"2. Multiple mutations"),Object(s.b)("p",null,"\ub9ac\uc561\ud2b8\ub294 \ubaa8\ub4e0 \uc561\uc158\uc5d0 \ub300\ud574 \ud56d\uc0c1 \ub80c\ub354\ub97c \uc2dc\ub3c4\ud55c\ub2e4. \ud558\ub098\uc758 \uc561\uc158\ub9cc\uc774\ub77c\ub3c4 \ubaa8\ub4e0 ",Object(s.b)("inlineCode",{parentName:"p"},"connect"),"\ub85c \uc5f0\uacb0\ub41c \ucef4\ud3ec\ub10c\ud2b8\uc758 ",Object(s.b)("inlineCode",{parentName:"p"},"mapStateToProps"),"\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4. \uc774\ub85c \uc778\ud574, \uc2a4\ud14c\uc774\ud2b8\uc758 \uc5f0\uc18d\uc801\uc778 \ubcc0\uacbd\uc774 \ud544\uc694\ud55c \uacbd\uc6b0, \ub9ce\uc740 \uc77c\uc744 \ud558\ub294 \uc561\uc158\uc744 \ub9cc\ub4e4 \ud544\uc694\uac00 \uc788\ub294\ub370, \uc774\ub294 \ucf54\ub4dc\uc758 \ud63c\uc7a1\ub3c4\ub97c \uc5c4\uccad\ub098\uac8c \uc62c\ub824\ubc84\ub9b0\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),"store.dispatch(setA())\nstore.dispatch(setB())\nstore.dispatch(setC())\n")),Object(s.b)("p",null,"\uac19\uc740 \uacbd\uc6b0 \uae30\ub2a5\uc774 \ubc14\ub00c\uc5b4\uc11c setB\ub97c \uc9c0\uc6b0\ub824\uace0 \ud558\uba74 \ucf54\ub4dc \ud55c\uc904\ub9cc \uc218\uc815\ud558\uba74 \ub418\uc9c0\ub9cc,"),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),"store.dispatch(setAAndBAndC())\n")),Object(s.b)("p",null,"\uac19\uc740 \uacbd\uc6b0, \uc0c8\ub85c\uc6b4 ",Object(s.b)("inlineCode",{parentName:"p"},"setAAndB"),"\ub77c\ub294 \uc561\uc158\uc744 \ub9cc\ub4e4\uace0, \ub9ac\ub4c0\uc11c \uc5ed\uc2dc \uc218\uc815\uc774 \ud544\uc694\ud558\ub2e4."),Object(s.b)("p",null,"\uc774\ub97c \ud574\uacb0\ud558\uae30 \uc704\ud574 \uba87\uac00\uc9c0 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub4e4\uc774 \uc788\uc9c0\ub9cc, redux-saga\uac19\uc740 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub791 \uc5f0\ub3d9\uc774 \ub418\ub294 \uac83\ub3c4 \ubcc4\ub85c \uc5c6\uace0, \ud0c0\uc785\uc815\uc758\ub294 \ucee4\ub155 \uad00\ub9ac\ub3c4 \uc548\ub418\ub294 \ub77c\uc774\ube0c\ub7ec\ub9ac\uac00 \ub300\ubd80\ubd84\uc774\ub2e4."),Object(s.b)("blockquote",null,Object(s.b)("p",{parentName:"blockquote"},"\ub0b4\uac00 \uc804 \ud68c\uc0ac\uc5d0\uc11c \ub9cc\ub4e4\uc5b4\ub454 \ub77c\uc774\ube0c\ub7ec\ub9ac\uc774\ub2e4. \ud544\uc694\ud558\ub2e4\uba74 \uc774\uac78 \ucc38\uace0\ud558\uba74 \uc88b\uc744 \ub4ef \ud558\ub2e4. ",Object(s.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/Revisolution/typed-redux-kit/tree/master/packages/batch-enhancer"}),"https://github.com/Revisolution/typed-redux-kit/tree/master/packages/batch-enhancer"))),Object(s.b)("p",null,"MobX\uc758 \uacbd\uc6b0, ",Object(s.b)("inlineCode",{parentName:"p"},"@action")," \ub370\ucf54\ub808\uc774\ud130\uc5d0 \ubba4\ud14c\uc774\uc158 \ud568\uc218\ub97c \uac10\uc2f8\ub460\uc73c\ub85c\uc368, \ucd5c\uc0c1\uc704 \uc2a4\ud0dd\uc758 \ubba4\ud14c\uc774\uc158 \ud568\uc218(\uac00\uc7a5 \uba3c\uc800 \ucd5c\uc0c1\ub2e8\uc5d0\uc11c \ubd88\ub7ec\uc9c4 \uc561\uc158)\uac00 \ub05d\ub0a0 \ub54c \uae4c\uc9c0 \ub80c\ub354\ub97c \uc2dc\ud0a4\uc9c0 \uc54a\ub294\ub2e4."),Object(s.b)("h1",null,"3. \uae4a\uc740 \uc2a4\ud14c\uc774\ud2b8\uc640 \ubd88\ubcc0\uc131"),Object(s.b)("p",null,"\uc5b4\ub5a4 \uc561\uc158\uc774 \uae4a\uc740 \uacf3\uc5d0 \uc788\ub294 \uac12\uc744 \ubc14\uafc0 \uacbd\uc6b0, \ubd88\ubcc0\uc131 \uc720\uc9c0\ub97c \uc704\ud574 \ud55c\ub2e8\uacc4\uc529 \uc778\uc2a4\ud134\uc2a4\ub97c \uc0c8\ub85c \ub9cc\ub4e4\uc5b4 \uc904 \ud544\uc694\uac00 \uc788\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"const")," myReducer = ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-function"}),"(",Object(s.b)("span",Object(n.a)({parentName:"span"},{className:"hljs-params"}),"state, action"),") =>")," ({\n  ...state,\n  depth1: {\n    ...state.depth1,\n    depth2: {\n      ...state.depth1.depth2,\n      depth3: {\n        ...state.depth1.depth2.depth3,\n        depth4: action.payload\n      },\n    },\n  },\n})\n")),Object(s.b)("p",null,"\ubb3c\ub860 Immutable.js\ub97c \uc4f0\uba74 \uc870\uae08 \ub0ab\uae34 \ud558\uc9c0\ub9cc, \uc5ed\uc2dc \ud504\ub85c\ud37c\ud2f0\uac12\uc744 string\uc73c\ub85c \uc8fc\uace0 \ubc1b\uc544\uc57c \ud558\ub294 \uc810 \ub108\ubb34 \uad34\ub86d\ub2e4.\n",Object(s.b)("inlineCode",{parentName:"p"},"getIn"),", ",Object(s.b)("inlineCode",{parentName:"p"},"setIn"),"\ub4f1\uc758 \ud568\uc218\ub97c \uc4f8 \ub54c, \uc2a4\ud14c\uc774\ud2b8 \ud2b8\ub9ac\uac00 \uc870\uae08\ub9cc\uc774\ub77c\ub3c4 \uae4a\uc5b4\uc9c0\uba74 ",Object(s.b)("strong",{parentName:"p"},"\ud14c\uc2a4\ud2b8\uc5d0 \uc758\uc874\ud558\uc9c0 \uc54a\uace0\ub294 \uc81c\uc815\uc2e0\uc73c\ub85c \ucf54\ub529\uc744 \ud560 \uc218\uac00 \uc5c6\ub2e4.")),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"obj.some.where.deep.underground"),"\uac19\uc740 \ud615\ud0dc\uac00 \uc788\uace0,\n\uc5ec\uae30\uc5d0 ",Object(s.b)("inlineCode",{parentName:"p"},"where"),"\ub97c ",Object(s.b)("inlineCode",{parentName:"p"},"wheree"),"\ub85c \uc798\ubabb \uc785\ub825\ud588\ub2e4\uace0 \uc0dd\uac01\ud574\ubcf4\uc790."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),"obj.getIn([",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-string"}),"'some'"),", ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-string"}),"'wheree'"),", ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-string"}),"'deep'"),", ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-string"}),"'underground'"),"])\n",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-literal"}),"undefined"),"\n")),Object(s.b)("p",null,"\uc774 \ucf54\ub4dc\ub294 \uc544\ubb34\uac83\ub3c4 \uc54c\ub824\uc8fc\uc9c0 \uc54a\uace0 ",Object(s.b)("inlineCode",{parentName:"p"},"undefined"),"\ub97c \ubc49\ub294\ub2e4. \ub7f0\ud0c0\uc784\uc5d0\uc11c\ub3c4 \uc5d0\ub7ec\uac00 \ub098\uc9c0 \uc54a\ub294 \ub9cc\ud07c, \ub514\ubc84\uae45 \uacbd\ud5d8\uc740 \ucd5c\uc545\uc5d0 \ub2e4\ub2e4\ub978\ub2e4. \uba87\ubc88\uc9f8 \uc904\uc5d0\uc11c \ubb38\uc81c\uac00 \uc0dd\uacbc\ub294\uc9c0, \uba87\ubc88\uc9f8 \ud0a4\uac12\uc774 \uc798\ubabb \uc785\ub825\ub42c\ub294\uc9c0\ub97c \ub208\uc73c\ub85c \ud655\uc778\ud574\uc11c \uace0\uccd0\uc57c\ud55c\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),"obj.some.wheree.deep.underground\nUncaught ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-built_in"}),"TypeError"),": Cannot read property ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-string"}),"'deep'")," of ",Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-literal"}),"undefined"),"\n")),Object(s.b)("p",null,"\ubc18\uba74, MobX\ub294 \ub2e4\uc74c\uacfc \uac19\uc774 \uace7\ubc14\ub85c \uc5d0\ub7ec\ub97c \ubc49\uc5b4\ubc84\ub9ac\ubbc0\ub85c \uadf8\ub7f4 \uc5ec\uc9c0\uac00 \uc5c6\ub2e4. \ub610\ud55c, \ud0a4\uac12\uc774 \ubb38\uc790\uc5f4\ub85c \ub418\uc5b4\uc788\uc9c0 \uc54a\uc740\ub9cc\ud07c, \ud0c0\uc785 \ucd94\ub860\uc774 \uac00\ub2a5\ud558\ubbc0\ub85c Typescript\uc640 \uc798\uc5b4\uc6b8\ub9b0\ub2e4. (",Object(s.b)("inlineCode",{parentName:"p"},"Immutable.Record"),"\ub3c4 \ud504\ub85c\ud37c\ud2f0\uc774\ub984\uc73c\ub85c \ud0c0\uc785\ucd94\ub860\uc774 \uac00\ub2a5 \ud558\uc9c0\ub9cc ",Object(s.b)("inlineCode",{parentName:"p"},"getIn"),", ",Object(s.b)("inlineCode",{parentName:"p"},"setIn"),"\ucc98\ub7fc \uae4a\uc774 \uac00\uc57c\ud560 \uacbd\uc6b0, \ud0c0\uc785 \ucd94\ub860\uc774 \ubd88\uac00\ub2a5\ud558\ub2e4.)"),Object(s.b)("h1",null,"4. \uc544\ud508 \uc190\uac00\ub77d\uacfc \uc758\uc678\ub85c \uc791\uc9c0\uc54a\uc740 \ub7ec\ub2dd\ucf54\uc2a4\ud2b8"),Object(s.b)("p",null,"Redux\ub294 \uae30\ub2a5\uc744 \ud558\ub098 \ucd94\uac00\ud558\ub824\uba74 ActionType\uacfc ActionCreator, \uadf8\ub9ac\uace0 \uc774\uac78 \ub2e4\ub8e8\ub294 Reducer\ub97c \uc190\ub300\uc5b4\uc57c\ud55c\ub2e4. \uc5ec\uae30\uc5d0 Typescript\ub97c \uc4f8\uacbd\uc6b0, Action\uc5d0 \ub300\ud55c \uc778\ud130\ud398\uc774\uc2a4 \uc5ed\uc2dc \ub9cc\ub4e4\uc5b4\uc8fc\uc5b4\uc57c \ud558\ubbc0\ub85c \ub9e4\uc6b0 \ud53c\uace4\ud558\ub2e4.\n\uadf8\ub9ac\uace0 ",Object(s.b)("inlineCode",{parentName:"p"},"combineReducers"),"\ub97c \uc4f0\ub824\uba74 ",Object(s.b)("strong",{parentName:"p"},"\ubaa8\ub4e0 \uc561\uc158 \uc778\ud130\ud398\uc774\uc2a4"),"\ub97c \ubaa8\uc544\uc11c \uc720\ub2c8\uc5b8\ud0c0\uc785\uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc8fc\uc5b4\uc57c \ud558\ub294\ub370, \uc774\uac83\ub3c4 \uc0ac\ub78c \ud560 \uc9d3\uc774 \ubabb\ub41c\ub2e4."),Object(s.b)("pre",null,Object(s.b)("code",Object(n.a)({parentName:"pre"},{className:"hljs language-ts"}),Object(s.b)("span",Object(n.a)({parentName:"code"},{className:"hljs-keyword"}),"type")," AllAction = SetAAction | SetBAction | SetCAction | ...\n")),Object(s.b)("p",null,"\ub9d0\uadf8\ub300\ub85c \ubaa8\ub4e0 \uc561\uc158\uc744 \ub2e4 \uac00\uc838\uc640\uc57c\ud558\ubbc0\ub85c \uc5ec\ub7ec \ubaa8\ub4c8\ub85c \ubd84\ub9ac\ub41c \uacbd\uc6b0 \uc21c\ud658\uc758\uc874\uc774 \uc77c\uc5b4\ub098\uc9c0 \uc54a\ub3c4\ub85d \uc2e0\uacbd\uc4f8 \ud544\uc694\uae4c\uc9c0 \uc0dd\uae34\ub2e4."),Object(s.b)("p",null,"\uadf8\ub9ac\uace0 ",Object(s.b)("inlineCode",{parentName:"p"},"connect"),"\uc5d0\uc11c\ub294 ",Object(s.b)("inlineCode",{parentName:"p"},"mapStateToProps"),", ",Object(s.b)("inlineCode",{parentName:"p"},"mapDispatchToProps"),", ",Object(s.b)("inlineCode",{parentName:"p"},"mergeProps"),"\uc758 \uacb0\uacfc\uac12\uc744 \uc778\ud130\ud398\uc774\uc2a4\ub85c \uad00\ub9ac\ud574\uc8fc\uc5b4\uc57c\ud55c\ub2e4. \uadf8\ub9ac\uace0 \uc774\uac83\ub4e4\uc740 \ub2e4 \uc81c\ub124\ub9ad\uc73c\ub85c \uc8fc\uace0 \ubc1b\uc73c\ubbc0\ub85c, \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\uc640 \ub9ac\ub355\uc2a4\uc5d0 \uc81c\ub300\ub85c\ub41c \uc774\ud574\uac00 \ub41c \uc0ac\ub78c\uc774 \uc544\ub2c8\uace0\ub294 \ucef4\ud30c\uc77c \uc5d0\ub7ec\ub97c \ud1b5\uacfc\uc870\ucc28 \ubabb\ud560 \uac83\uc774\ub2e4."),Object(s.b)("p",null,"\ubc18\uba74, MobX\ub294 \ucc98\uc74c\ubd80\ud130 Typescript\ub85c \uc4f0\uc5ec\uc788\uc5b4\uc11c, Decorator\ub97c \uc5b8\uc81c \uc368\uc57c\ud558\ub294\uc9c0\ub9cc \uc775\uc219\ud574\uc9c0\uba74 \ub9e4\uc6b0 \uc2ec\ub9ac\uc2a4\ud558\uac8c \uac1c\ubc1c\uc744 \ud560 \uc218 \uc788\ub2e4. ",Object(s.b)("strong",{parentName:"p"},"\uc5b4\ub5a4 \uac12\uc774 \uae30\uc5b5\ub418\uc57c\ud558\ub294\uc9c0, \uc5b8\uc81c \ucef4\ud3ec\ub10c\ud2b8\ub97c \ub2e4\uc2dc \ub80c\ub354\ub9c1\ud574\uc57c\ud558\ub294\uc9c0"),"\ub97c \uc54c\uc544\uc11c \ud1b5\uc81c\ud574\uc8fc\ub294 \ub9cc\ud07c, \uc774\uac78 \uc9c1\uc811 \uad6c\ucd95\ud574\uc57c\ud558\ub294 Redux\uc640 \ube44\uad50\ud558\uba74 \ud6e8\uc52c \uc190\uac00\ub77d\uc774 \uc548\uc544\ud504\uace0 \uc27d\uc9c0 \uc54a\uc744\uae4c \uc0dd\uac01\ud55c\ub2e4."),Object(s.b)("h1",null,"\ub9c8\ubb34\ub9ac"),Object(s.b)("p",null,"\uc704\uc758 \uc774\uc720\ub4e4\ub85c \uac1c\ubc1c\uc911\uc778 \uc571\ub4e4\uc744 ",Object(s.b)("strong",{parentName:"p"},"MobX\ub85c \ubc14\uafbc \uc774\ud6c4, \ub2e4\uc2dc \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub85c \ud558\ub294 \ub9ac\uc561\ud2b8 \uac1c\ubc1c\uc774 \uc990\uac70\uc6cc\uc9c4\uac70 \uac19\ub2e4.")," \uc368\ubcf4\uba74 \ud655\uc2e4\ud788 \uac1c\ubc1c\uc5d0 \uc18c\uc694\ub418\ub294 \uc2dc\uac04\uc774 \ub2e8\ucd95\ub418\ub294\uac8c \ub290\uaef4\uc9c8 \uac83\uc774\ub2e4. \ub9cc\uc57d \ub2f9\uc2e0\uc774 \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc4f0\uace0 \uc788\uace0, \ub098\uc640 \ube44\uc2b7\ud55c \uace0\ud1b5\uc744 \ubc1b\uace0 \uc788\ub2e4\uba74 \uaf2d MobX\ub97c \uc368\ubcf4\uae38 \ubc14\ub780\ub2e4."),Object(s.b)("p",null,"\ub2e8, ",Object(s.b)("strong",{parentName:"p"},"\ucc98\uc74c \ub9ac\uc561\ud2b8\ub97c \uc0ac\uc6a9\ud558\ub294 \uc0ac\ub78c\uc774\uba74 Redux\ubd80\ud130 \ub2e4\ub904\ubcf4\uae38 \uad8c\ud55c\ub2e4.")," \uc65c MobX\uc758 \uc774\ub7ec\ud55c \uae30\ub2a5\ub4e4\uc774 \uc808\uc2e4\ud55c\uc9c0, \uba3c\uc800 Redux\ub85c \ubb34\uc5b8\uac00\ub97c \ub9cc\ub4e4\uace0 \ub098\uba74 \uc5c4\uccad \uccb4\uac10\ud558\uc9c0 \uc54a\uc744\uae4c?"),Object(s.b)("h1",null,"\ucd94\uc2e0: \uadf8\ub7fc \ub10c \uc65c \uc774\uc81c\uc11c\uc57c \uc4f0\ub0d0?"),Object(s.b)("p",null,"\uc194\uc9c1\ud558\uac8c \ub9d0\ud574 \ub098\uc758 \uc4f8\ub370\uc5c6\ub294 \uc790\uc874\uc2ec \ub54c\ubb38\uc774\uc5c8\ub2e4. Redux\uac00 \uc21c\uc218\ud55c \ud568\uc218\ud615 \ud504\ub85c\uadf8\ub798\ubc0d\uc778\ub9cc\ud07c \ub77c\uc774\ube0c\ub7ec\ub9ac\uc5d0 \ub300\ud574 \uc2e0\ub8b0\ub3c4\uac00 \ub192\uace0, \uace0\ub85c \ub0b4\uac00 \ud1b5\uc81c\uac00\ub2a5\ud55c \ucf54\ub4dc\ub97c \uc4f8 \uc218 \uc788\uc9c0 \uc54a\uaca0\ub290\ub0d0\uc5ec\uc11c\ub2e4. \ucc98\uc74c MobX\ub97c \uc37b\uc744 \ub54c, ",Object(s.b)("inlineCode",{parentName:"p"},"componentShouldUpdate"),"\uac00 \uc791\ub3d9\ud558\uc9c0 \uc54a\ub294\uac78 \ubcf4\uace0, React\uc758 \uae30\ubcf8\uc801\uc778 \ub77c\uc774\ud504\uc0ac\uc774\ud074\uc5d0 \uc601\ud5a5\uc744 \uc8fc\ub294\uac8c \uc870\uae08 \ubd88\ucf8c\ud588\ub358\uac70 \uac19\ub2e4.\n\uadf8 \uc774\uc678 \uc790\uc798\ud55c \ud551\uacc4\ub294 \ub370\ucf54\ub808\uc774\ud130 \uc815\ub3c4\uc77c\uae4c? Babel\uc758 \ub370\ucf54\ub808\uc774\ud130\ub294 \uc544\uc9c1\uae4c\uc9c0\ub3c4 \uc2a4\ud399\ub300\ub85c \uad6c\ud604\uc774 \uac1c\uc120 \uc548\ub41c \uc0c1\ud0dc\uac00 \uacc4\uc18d \uc774\uc5b4\uc9c0\uace0 \uc788\ub2e4. \ub2e8, \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8 \ucef4\ud30c\uc77c\ub7ec\uc5d0\uc11c\uc758 \uad6c\ud604\uc740 \uc798 \ub418\uc5b4\uc788\uc73c\ubbc0\ub85c \ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc4f4\ub2e4\uba74 \ub531\ud788 \uc2e0\uacbd \uc4f8 \ud544\uc694\uac00 \uc5c6\ub294 \ub4ef \ud558\ub2e4."))}m.isMDXComponent=!0}},[["MpHe",1,0]]]);