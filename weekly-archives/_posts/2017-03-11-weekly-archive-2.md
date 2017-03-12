---
layout: post
title: Weekly Archive 2
date: 2017-03-11 22:00:00 +0900
---

## 2017-03-05

### Remark Math

커버리지 테스트를 하니 코드 구석구석을 신경 쓸 수 있어서 좋았다. 덕분에 신경쓰지 못한 경우까지 테스트로 바꿔넣어 줄 수 있었다.

앞으로 할 일은 MathJax로의 대응인데 우선 블로그부터 완성 시키고 나서 시작해야겠다.

### [Ehtereum][ehtereum]

저번주부터 이더리움에대해 여러가지 생각을 하고 있다. 오늘 떠오른건 우버X와 카카오택시에 대한건데, 혹시 우버X가 이더리움 기반으로 제공될경우 과연 누구에게 법적인 책임을 물을 수 있을까?

그리고 서비스의 주체가 없어지면 오히려 기존의 수수료없이 순수하게 택시기사와 고객간의 거래가 이루어 질 수 있을 것이고, 동시에 매우 투명하게 서로간의 평가까지 관리 될 수 있을 것이다.

좀 더 깊게 생각해봐야겠다.

개인적으로 카카오나 네이버같은 대기업들이 이런 사업들을 지배하는게 아니꼽다. 포털도 네이버가 지배하고 있고... 아마 내버려두면 대기업들의 형편에 맞춰 고생하는 사람들이 늘기만 할듯

이러다 아나키스트 다되겠네... 여튼 일 정리되는대로 빨리 손대어 보고 싶다.

### Jekyll

블로그 쓰면서 느낀건데 링크넣기 정말 귀찮아죽겠다. 특히 깃허브 이슈면 URL표시하는 스타일이 정형화되어있는데 kramdown으로는 어떻게 하기가 힘드네... 무슨 방법이 있을지 좀 생각해봐야겠다.

### PWA

아웃사이더 님이 공유해주신 [프로덕션에 사용되는 프로그레시브 웹 앱 라이브러리들](https://medium.com/dev-channel/progressive-web-app-libraries-in-production-b52cad37d34#.ptbioslwu)가 상당히 흥미로웠다. 주로 서비스워커와 캐시스토리지를 사용하는 듯 하다.
그리고, 웹팩 플러그인이 있어서 의외로 어렵지않게 도입이 가능 할 듯하다.

또한, 구글 아날리틱스의 오프라인대책까지 있어서 한번 다시 읽어봐야 할 것같다.

## 2017-03-09

포스팅을 준비하려 했는데 Lerna나 마크다운 파싱 얘기나 Jest사용법이 짬뽕이 되서 도저히 알아보기 힘든 글 밖에 안나왔다. 결국 계속 수정을 거듭했는데 일단 보류하는게 나을 것 같다. 만들고픈것이 산더미인데 너무 시간낭비가 커지는 듯 하다.

일단은 Fourteen의 개발을 우선해서 시작한다. 일렉트론을 너무 오랬동안 손을 놓은듯 해서 다시 못만질까 조금 불안하다.

## 2017-03-11

이번주는 이것저것 읽을게 너무 많아서 그다지 한 일이 없는듯하다. 그리고 Fourteen의 데이터 스키마에 대해 계속 고찰했다. 일단 골은 찾은 듯하니 다음주부터 조금씩 정리를 해야겠다.

밑은 읽어본 글들을 리스트이다 대부분 해커뉴스와 아웃사이더님의 공유로부터 보게된 글들이다.

- [내가 맥을 그만둔 이유](http://char.gd/microsoft/why-i-left-mac-for-windows/) - 해커뉴스
  확실히 공감하는 부분이다. 다른 불편함없이 작업에만 집중할 수 있게 해주어서 맥북이 좋았는데 점점 그 의미가 퇴색되어가는 듯하다. 반대로 윈도우즈는 상당히 신경쓰는 듯해서 윈도우즈쪽이 더 기대된다.
- [프로덕션에 사용되는 프로그레시브 웹 앱 라이브러리들](https://medium.com/dev-channel/progressive-web-app-libraries-in-production-b52cad37d34#.ptbioslwu) - 아웃사이더님의 공유
  웹워커와 캐시스토리지를 활용해서 스크립트를 빠르게 불러오는 형식이었다. 웹팩을 쓸 경우 플러그인까지 제공해주어 더욱 간단히 적용할 수 있는게 인상적이었던듯하다.
  또한, 구글 아날리틱스도 오프랑니에서 사용이 가능하다는 것을 처음 알았다.
- [PRPL 패턴](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) - 검색
- [네이티브 iOS와 리액트 네이티브의 성능 비교](https://medium.com/the-react-native-log/comparing-the-performance-between-native-ios-swift-and-react-native-7b5490d363e2#.ckam9w1td) - 해커뉴스
- [오픈소스 자브스크립트 책](https://www.ossblog.org/master-javascript-programming-with-open-source-books/) - 해커뉴스
- [V8:무대뒤의 이야기(2월 배포판)](http://benediktmeurer.de/2017/03/01/v8-behind-the-scenes-february-edition/) - 아웃사이더님의 공유
- [더 나은 릴리즈 노트를 디자인하자](https://uxdesign.cc/design-better-release-notes-3e8c8c785231#.k6kgxxhqa) - 아웃사이더님의 공유

[ehtereum]: https://www.ethereum.org/
