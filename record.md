# 1. express js app 만들기

- npm init
- index.js 생성
- express 설치 {`npm install express --save`}
- express js 앱 만들기
- start 명령어 추가 {`npm run start`}

# 2. mongoDB 연결

- mongoDB 클라스터 생성 [mongoDB 홈페이지]
- mongoDB 유저 생성 [mongoDB 홈페이지]
- mongoose 설치 {`npm install mongoose --save`}
- mongoose.connect()
- npm run start 테스트 - mongoDB 연결 확인

# 3. User Model & Schema 생성

> Model: Schema 를 감싸주는 역할 / Schema: 데이터 정보를 지정

- modules > User.js 생성 후 모델, 스키마 작성

# 4. SSH를 이용해 GITHUB 연결

- ssh-key 생성 {`ssh-keygen -t ed25519 -C "hyeun9991@gmail.com"`}
- ssh agent를 background에 켜기 {`eval "(ssh-agent -s)"`}
- ssh-pub key를 ssh-agent에 add {`ssh-add -K ~/.ssh/id_rsa`}
- ssh-pub를 github에 연결 {`pbcopy < ~/.ssh/id_rsa.pub`}
- github/setting/ssh and gpg keys에 생성한다음 복사 붙여넣기

# 5. 회원 가입 기능 구현

- body-parser 설치 {`npm install body-parser --save`}
- postman 다운 [컴퓨터에]
- body-parser 삭제 (해당 기능은 express에 기본적으로 포함되어있음.) {`npm uninstall body-parser`}
- client에서 오는 정보를 server가 분석할 수 있게 설정
- client에서 받은 데이터를 비동기 post 방식으로 데이터베이스에 저장
- server 켜고 postman에서 테스트 - {`success: true`}

# 6. nodemon

> nodemon: 소스의 변화를 감지해서 변화된 부분을 반영해주는 것
> --save-dev: development mode, local에서만 사용하겠다는 의미
> 서버를 끄지 않고 새로고침만 해도 새로운 내용이 반영됨

- nodemon 설치 {`npm install nodemon --save-dev`}
- backend 명령어 추가 {`npm run backend`}

# 7. 비밀정보 보호화

> mongoDB 연결할 때 필요한 id, password 정보를 .gitignore파일에 추가해서 보호화하기

- config > dev.js, prod.js, key.js 생성 후 환경변수 설정
