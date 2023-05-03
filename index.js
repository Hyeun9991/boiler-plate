// backend server
const express = require("express");
const app = express();
const port = 8080;
const { User } = require("./models/User");
const config = require("./config/key");

// client에서 오는 정보를 server가 분석할 수 있게 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("apple!"));

// 회원가입 - client에서 전달받은 data를 DB에 저장
app.post("/register", async (req, res) => {
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

// 로그인
app.post("/login", (req, res) => {
  // 1. 요청된 이메일이 DB에 있는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 3. 비밀번호가 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        
      })
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
