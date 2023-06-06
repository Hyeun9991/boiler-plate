# Boiler Plate Project

React + Node.js + MongoDB를 이용해서 로그인 & 로그아웃, 회원가입 기능이 있는 탬플릿 프로젝트

<br>
<br>

## 기술 스택

- React
- JavaScript
- Redux
- Node.js
- Express
- Mongoose
- Styled-Components

<br>
<br>

## 프로젝트 세팅

1. server>config>dev.js 파일 생성
2. mongoDB 정보를 dev.js 파일에 작성

   ```js
   // server>config>dev.js
   module.exports = {
     mongoURI: 'mongodb uri 정보 입력',
   };
   ```

3. root> `npm install` (백엔드 종속서 다운로드)
4. client> `npm install` (프론트엔드 종속서 다운로드)

<br>
<br>

## 주요 기능

- 로그인, 로그아웃, 회원가입
  - hoc auth 인증 체크
- 다크 모드
