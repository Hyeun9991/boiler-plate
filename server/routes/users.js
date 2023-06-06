const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

// 인증
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    const userData = await user.save();
    res.status(201).json({ success: true, userData });
  } catch (err) {
    let errorMessage = 'Unable to register user';
    if (err.code === 11000 && err.keyPattern.email === 1) {
      errorMessage = 'Email already exists';
    }
    res.status(400).json({ success: false, message: errorMessage });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    // db에서 이메일 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    }

    // email이 있다면, DB에 저장된 비밀번호와 비교
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({ loginSuccess: false, message: 'wrong password' });
    }

    // password가 일치하면 token 생성
    const token = await user.generateToken();

    // token을 cookie에 저장
    res
      .cookie('x_auth', token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (error) {
    res.status(500).json({
      loginSuccess: false,
      message: 'An error occurred while logging in ',
    });
  }
});

// 로그아웃
router.get('/logout', auth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '', tokenExp: 0 } // 토큰 및 토큰 만료 시간 초기화
    );

    if (!user) {
      return res.json({ success: false, message: 'Failed to logout' });
    }

    return res.status(200).send({ success: true });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
