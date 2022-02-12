const express = require('express');
const connect = require('./models');
const cors = require('cors');
const app = express();
const port = 3000;
connect();

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());
    next();
  };

app.use(express.static("assets"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // 빈칸으로 두면 모든 요청 허용
app.use(requestMiddleware);

app.use('/api', [usersRouter, postsRouter]);

app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌습니다.')
});