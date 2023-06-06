const { User } = require('../models/user');

// 인증 처리 미들웨어
let auth = async (req, res, next) => {
  try {
    // cookie에서 token 가져옴
    let token = req.cookies.x_auth;

    // token을 복호화한뒤 유저를 찾음
    const user = await User.findByToken(token);

    if (!user) {
      return res.json({ isAuth: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
};

module.exports = { auth };
