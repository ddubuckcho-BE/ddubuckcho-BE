const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/posts");

// 게시물 모두 보여주기 (메인페이지)
router.get("/post_list", controller.getPosts);

// 게시물 생성
router.post("/post", authMiddleware, controller.makePosts);

// 게시물 상세페이지
router.get("/detail/:postId", controller.detailPosts)

// 게시물 수정하기를 들어갈 수 있는 권한 확기 (수정)
router.get("/detail/:postId", authMiddleware, controller.goModifyPosts)

// 게시물 수정하기 완료 버튼을 눌렀을 때

module.exports = router;
