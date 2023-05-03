# 1 express js app 만들기

- npm init
- index.js 생성
- npm install express --save
- express js 앱 만들기
- start 명령어 만들기 {명령어: `npm run start`}

# 2 mongoDB 연결

- mongoDB 클라스터 생성 [mongoDB 홈페이지]
- mongoDB 유저 생성 [mongoDB 홈페이지]
- mongoose 설치 {`npm install mongoose --save`}
- mongoose.connect()
- npm run start 테스트 - mongoDB 연결 확인

# 3 User Model & Schema 생성

> Model: Schema 를 감싸주는 역할 / Schema: 데이터 정보를 지정

- modules > User.js 생성 후 모델, 스키마 작성
