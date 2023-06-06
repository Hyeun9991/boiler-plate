const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();
const config = require('./config/key');
const mongoose = require('mongoose');

const mongoURL = config.mongoURI;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터를 파싱하기 위한 미들웨어
app.use(cookieParser());

// route 처리
app.use('/api/users', require('./routes/users'));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
