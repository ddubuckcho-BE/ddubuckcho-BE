const express = require("express");
const multer  = require('multer')
const _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets/images");
    },
    filename: function (req, file, cb) {
      cb(null, +Date.now()+'-'+file.originalname);
    }
  })
const upload = multer({ storage: _storage})

const router = express.Router();
const mainMiddleware = require("../middlewares/main-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const controller = require("../controller/posts");
const controller2 = require("../controller/likes");

// 게시물 모두 보여주기 (메인페이지)
router.get("/post_list", mainMiddleware, controller.getPosts);

// 게시물 생성
router.post("/post", authMiddleware, upload.single('thumbnail'), controller.makePosts);

// 게시물 상세페이지
router.get("/detail/:postId", controller.detailPosts)

// 게시물 수정하기를 들어갈 수 있는 권한 확기 (수정)
router.get("/detail/gomodify/:postId", authMiddleware, controller.goModifyPosts)

// 게시물 수정하기 완료 버튼을 눌렀을 때
router.put("/update/:postId", authMiddleware, upload.array('editThumbnail'), controller.modifyPosts)

// 게시물 삭제하기
router.delete("/delete/:postId", authMiddleware, controller.deletePosts)

// 게시물 좋아요
router.put("/editLike/:post_id", authMiddleware, controller2.makeLikes);

// 게시물 좋아요 취소
router.put("/deleteLike/:post_id", authMiddleware,  controller2.deleteLikes);

module.exports = router;
