const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // saltRounds: salt가 몇 글자인지 정의
const jwt = require("jsonwebtoken");

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
  } else {
    next();
  }
});

// 비밀번호 확힌 메소드
userSchema.methods.comparePassword = function (plainPassword) {
  const user = this;
  return bcrypt.compare(plainPassword, user.password).catch((err) => {
    throw new Error(err);
  });
};

// 토큰 생성 메소드
userSchema.methods.generateToken = async function () {
  try {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), "secretToken"); // user id와 'secretToken'을 합쳐서 토큰 생성
    user.token = token; // user token field에 생성한 token 넣기
    await user.save(); // 저장 후 반환된 user를 사용하기 위해 await 키워드 사용
    return user; // 반환값으로 user 정보 전달
  } catch (err) {
    throw new Error(err); // 예외 발생
  }
};

// model로 schema 감싸기
const User = mongoose.model("User", userSchema);

module.exports = { User };
