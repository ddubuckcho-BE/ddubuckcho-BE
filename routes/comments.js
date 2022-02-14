const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const { makeComment, getComments, modifyComment, deleteComment } = require('../controller/comments');

// 코멘트 생성
router.post("/make_comment", authMiddleware, makeComment);

// 코멘트 불러오기
router.get("/comments/:id", getComments);

// 코멘트 수정
router.put("/update/:commentId", authMiddleware, modifyComment);

// 코멘트 삭제
router.delete("/delete/:commentId", authMiddleware, deleteComment);

module.exports = router;