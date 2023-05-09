# 1. Create-React-App 만들기

> src 폴더만 webpack이 관리해줌
> 그래서 image 같은거는 src 폴더에 넣어야한다.

- client 폴더 생성
- CRA 프로젝트 시작 {`npx create-react-app .`}
- 불필요한 파일 삭제
- 폴더, 파일 추가

# 2. React Router Dom

- React Router Dom 설치 {`npm install react-router-dom`}
- App.js 파일에 component route 설정 (landing, login, register page)

# 3. Axios

- axios 설치 {`npm install axios --save`}

# 4. cors 이슈, proxy

> proxy를 설정해서 cors 이슈 해결

- http proxy middleware 설치 {`npm install http-proxy-middleware --save`}
- src>setupProxy.js 파일 생성 (target: server port)

## proxy server는 무엇일까?

- 인터넷에 접근하는 사람의 IP를 proxy server가 변경할 수 있다.
- 보내는 데이터도 임의로 바꿀 수 있다.
- 방화벽 기능
- 웹 필터 기능
- 캐쉬 데이터, 공유 데이터 제공 기능

### 사용 이유

- 회사, 집안에서 인터넷 사용 제어
- 캐쉬를 이용해 더 빠른 인터넷 이용 제공
- 더 나은 보안 제공
- 이용 제한된 사이트 접근 가능

# 5. front, back server 한 번에 켜기 - with concurrently

- concurrently 설치 {`npm install concurrently --save`}
- package.json scripts에 dev 명령어 생성
  - `"dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""`

# 6. antd css framework

- 설치 {`npm install antd --save `}
