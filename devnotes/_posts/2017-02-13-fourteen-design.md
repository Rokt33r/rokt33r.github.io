---
layout: post
title: Fourteen 설계
date: 2017-02-13 10:00:00 +0900
tags: [fourteen, pouchdb, electron]
---

Fourteen을 만들기에 앞서 개발에 대해 개념적인 설계를 한다.

## IPC

IPC는 인터 프로세스 커뮤니케이션의 약자로 프로세스간의 커뮤니케이션을 의미한다.

일렉트론은 렌더러 프로세스와 메인 프로세스로 나뉘어져 있다. 렌더러 프로세스의 경우 브라우저의 윈도우와 같으며 메인프로세스는 각각의 브라우저윈도우를 제어하고 OS의 API를 사용하게 해주는 역할을 한다. 본 앱의 경우는 데이터베이스를 메인프로세스에 만든다. 이유는 렌더러 프로세스의 경우 브라우저이기에 리프레시를 통해 너무 쉽게 프로세스를 죽일 수 있다. 이게 치명적인건 가령 파우치db의 동기화와 같은 중요한 타이밍에 유저가 임의로 리프레시를 시키는게 가능하다는 것이다. 또한 서버를 열어둘 경우 CLI툴이나 원격에서도 앱의 DB에 액세스하는게 가능하기 때문에 더욱 재밋는 시도가 가능해진다. (물론 외부에서의 접속시 인증수단을 가지는건 당연하다.)

프로세스간 내부의 데이터 송수단방식은 일렉트론 기본의 ipc라든가 여러가지가 있지만 그냥 TCP로 해도 충분할듯하다. 어차피 로컬이라 전송코스트는 싸다. 아마 본 앱의 대부분의 코스트는 렌더링과 데이터베이스 첫 기동시의 데이터 매핑일 것이다. 또한, TCP를 통한 접속이므로 웹앱을 만들떄도 데이터베이스 엑세스 부분의 코드는 대부분 그대로 활용 할 수 있게된다.

이 경우 포트번호를 뭘로할지 생각해야 한다. 대충 https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers 에서 아직 사용하지 않은 번호를 고르면 되지 않을 까 싶다.

여튼 정리해서 메인프로세스에서 PouchDB를 호스팅하고 렌더러 프로세스는 일반적인 PouchDB 서버의 http api를 통해 데이터를 액세스한다. 그리고 포트번호가 이미 사용중일 경우 +1을하여 다른 포트번호로 재시도를 하고, 렌더러는 포트번호가 바뀔 경우를 대비해 항상 로드시 Electron의 기본 ipc라이브러리를 활용해 포트번호를 요청하게 한다.

## 페이지 호스팅

어차피 DB호스팅 할거면 페이지도 똑같이 호스팅해도 될 것 같다. 리얼타임부분은 따로 웹소켓을 써도 되고 ipc를 써도 되고...

그리고 동기화 속도를 더 빠르게 하기 위해 딥스트림IO까지 고려 해볼 수 있다.
일단 오늘 한번 딥스트림IO시도를 하고 밤중에 다시 포스팅을 해봐야겠다.

## 데이터베이스 스킴

PouchDB는 그냥 도큐먼트 베이스의 데이터베이스라 MySQL처럼 테이블이라는 개념이 없다. 여기에 대한 대책이 필요하다. 물론 아이디나 새로운 고유 어트리뷰트를 추가하고 뷰를 통해 테이블처럼 나눌 수 있지만,  [nolanlawson/relational-pouch](https://github.com/nolanlawson/relational-pouch#many-to-many-relationships)를 사용하면 간단하게 해결이 가능할 듯 하다.

## 고려중인 사용 라이브러리

- Electron
- Electron Builder
- Electron Lets Move
- React
- Redux
- Styled Components
- Webpack 2
- Redux Saga
- React Router 4
- React Router Redux
- [Github Markdown CSS](https://github.com/sindresorhus/github-markdown-css)
- CodeMirror
- Remark
- Katex
- Superagent
- PouchDB
- LevelDB
- Jest
- Moment
- Octicons
- Standard
