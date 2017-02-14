---
layout: post
title: Fourteen으로의 Deepstream IO의 도입고려
date: 2017-02-14 13:00:00 +0900
tags: [deepstreamio, pouchdb]
---

DeepstreamIO를 채용해볼까 싶었는데 전체적으로 훑어보고는 그럴 필요 없는 듯하다.

먼저 파우치DB의 역할과 겹치는 부분이 많고, 데이터 충돌은 커버해주지만 오프라인 서포트까진 해주지 않는듯하다.
아마 일시적인 오프라인이나 시간차등의 문제는 해결 해 주겠지만, 장기간 연결이 안되는 환경의 경우는 직접 손을 대야 할 듯 하다.

파우치DB의 경우 완전한 레플리케이션을 클라이언트가 가지기에 이런 문제가 없다. 그 대신 클라이언트마다 DB편집 권한에 제한을 둬야 하는 경우, PouchDB는 해결책이 되지 못한다. 이미 완전한 레플리케이션을 가지기 때문에 DB에 접근이 가능한 순간부터 얼마든지 변조시킬 수 있다.

딥스트림의 인상적이었던건 실시간 게임이 간편하게 구축하는 예제가 있다는 것이다.
아마 게임이나 채팅 프로그램은 이를 이용하면 간단하게 만들 수 있을듯...

아마 구글 도큐먼트처럼 한 문서에대해 동시적인 편집이 필요할땐 있으면 좋을 듯하지만, 현재 내가 구상중인 앱의 사양상 필요가 없다.

결론은 지금은 웹소켓 서버를 파우치DB와 함께 호스팅 시키고, 동기화 정보만 소켓으로 뿌려주면 충분할 듯 하다.
덧붙여 [Socket Pouch](https://github.com/nolanlawson/socket-pouch)를 통해 호스팅까지 Http가 아닌 소켓으로 해보는것도 재밋을 듯 하다. 물론 여기까진 필요할지는 잘 모르곘다.