const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // saltRounds: salt가 몇 글자인지 정의

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백 없앰
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // 토큰  유효기간
    type: Number,
  },
});

// save() 하기 전에 이 코드 실행
userSchema.pre("save", function (next) {
  var user = this;

  // User Model안 field중에 password가 변환 될 때만 실행
  if (user.isModified("password")) {
    // 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // user.password: 플레인 비밀번호 / hash: 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

// model로 schema 감싸기
const User = mongoose.model("User", userSchema);

module.exports = { User };
