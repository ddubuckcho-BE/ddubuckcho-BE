const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/posts");

// 게시물 모두 보여주기 (메인페이지)
router.get("/post_list", authMiddleware, controller.getPosts);
// 게시물 작성 
router.post("/post", authMiddleware, controller.makePosts);
// 게시물 수정
router.put()
// 게시물 삭제

module.exports = router;
