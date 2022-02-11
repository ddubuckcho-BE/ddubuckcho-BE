const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const {
    signup,
    login,
    auth
} = require("../controller/users");

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/login', login);

// 로그인 확인
router.get('/auth', authMiddleware, auth)

module.exports = router;