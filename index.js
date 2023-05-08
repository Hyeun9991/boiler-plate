// backend server
const express = require("express");
const app = express();
const port = 8080;
const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

// client에서 오는 정보를 server가 분석할 수 있게 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("apple!"));

// 회원가입 - client에서 전달받은 data를 DB에 저장
app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body); // 인스턴스 생성

  // User Model에 저장
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

// 로그인 - 요청된 이메일을 데이터베이스에서 찾기
app.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
    // Password가 일치하면 토큰 생성
    const token = await user.generateToken();
    // 토큰을 저장
    res
      .cookie("x_auth", token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
