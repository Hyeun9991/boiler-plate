// backend server
const express = require("express");
const app = express();
const config = require("./config/key");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const port = 8080;

// client에서 오는 정보를 server가 분석할 수 있게 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookieParser 사용
app.use(cookieParser());

// mongoose 연결
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("apple!"));

// 회원가입
app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body); // 인스턴스 생성

  // client에서 전달받은 data를 User Model(DB)에 저장
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

// 로그인
app.post("/api/users/login", async (req, res) => {
  try {
    // 요청된 email을 DB에서 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 요청된 email이 있다면 password가 일치하는지 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // Password가 일치하면 token 생성
    const token = await user.generateToken();

    // token을 cookie에 저장
    res
      .cookie("x_auth", token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Auth
app.get("/api/users/auth", auth, async (req, res) => {
  // auth 미들웨어를 통과했다면 client에 데이터 전달
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.uesr.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// port 연결 확인
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
