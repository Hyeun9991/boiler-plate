const { User } = require("../models/User");

// 인증 처리 미들웨어
let auth = async (req, res, next) => {
  try {
    // 1. client cookie에서 token을 가져옴
    let token = req.cookies.x_auth;

    // 2. token을 복호화 한 후 user 찾기
    const user = await User.findByToken(token);
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    throw new Error(err);
  }

  // 4. user가 없으면 인증 실패
};

module.exports = { auth };
