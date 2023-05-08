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

# 5. {회원가입 1} 기능 구현

- body-parser 설치 {`npm install body-parser --save`}
- postman 다운 {컴퓨터에}
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

# 8. {회원가입 2} save() 하기 전에 Bcrypt로 비밀번호 암호화 - pre()

> pre(): save하기 전에 호출되는 코드, next를 실행하지 않으면 save가 되지 않기 때문에 타큐먼트 저장 전 최종 검증으로 쓸 수 있다.

- bcrypt 설치 {`npm install bcrypt --save`}
- User.js 파일에 pre() 메소드를 이용해서 함수? 생성
- User Model에 저장하기 전에 비밀번호 필드만 bcrypt로 암호화해서 저장하는 코드 작성

# 9. {로그인 1} 기능 구현 - with Bcrypt, comparePassword method

> client에서 전달 받은 user가 있는지, 비밀번호가 일치하는지 확인하는 코드 작성

- async로 비동기 login router 생성
- bcrypt.compare() 메소드를 이용해서 비밀번호를 확인하는 comparePassword 메소드 생성
- User.findOne() 메소드를 이용해서 요청된 email이 DB에 있는지 확인
- 생성한 comparePassword() 메소드를 이용해서 비밀번호가 일치하는지 확인

# 10. {로그인 2} 기능 구현 - with jsonwebtoken, generateToken method

> password가 일치하면 token을 생성하고, cookie에 token을 저장하는 코드 작성

- jsonwebtoken 설치 {`npm install jsonwebtoken -save`}
- cookie-parser 설치 {`npm install cookie-parser --save`}
- jwt.sign()을 이용해서 token을 생성하는 generateToken 메소드 생성
- 생성한 generateToken() 메소드를 이용해서 비밀번호가 일치하면 token을 생성
- cookieParser를 이용해서 token을 cookie에 저장

# 11. Auth 기능 구현

> 페이지 이동 때마다 로그인 되어있는지 안되어 있는지, 관리자 유저인지, 글을 쓸때나 지울때 권환이 있는지 등을 체크
> client cookie에 있는 token을 가져와서 DB에 있는 token과 같은지 확인

- root>middleware>auth.js 파일 생성
- 인증 처리를 하는 auth 미들웨어 생성
- jwt.verify()를 이용해서 토큰을 복호화하는 static method findByToken 생성
- auth router 생성, auth 미들웨어 적용, client에 데이터 전달

# 12. {로그아웃} 기능 구현

> 로그아웃할때 token을 지워주면 Auth 인증이 안되서 로그인 기능이 풀려버림.

- logout route 생성
- findOneAndUpdate()를 이용해서 user를 찾은다음에 token 삭제 하는 기능 구현