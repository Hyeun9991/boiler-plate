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

// 회원가입
app.post("/register", async (req, res) => {
  /**
   * client에서 전달받은 data를 DB에 저장
   *
   * {
   *    id: "eh",
   *    password: "2u319"
   * }
   * req.body에는 이런식으로 데이터가 들어있음.
   */

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
