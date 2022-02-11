const express = require("express");
const Posts = require("../models/posts");

// 메인페이지로 줄 정보 (게시물 목록) - 50완
module.exports.getPosts = async (req, res) => {
  const posts = await Posts.find().exec();
  const sortByLike = posts.sort((a, b) => b.id - a.id);
  const sortByNew = posts.sort((a, b) => b.like_count - a.like_count);

  res.json({
    sortByLike,
    sortByNew,
  });
};

// 새로운 게시물 생성 (db에 저장) - id가 어떤 변수 명으로 저장되는지 찾아야함
module.exports.makePosts = async (req, res) => {
  try {
    const { user } = res.locals;
    const { title, thumbnail, contents } = req.body;

    await Posts.create({
      userId: user.userId,
      thumbnail,
      contents,
      title,
    });

    res.json({ ok: "true" });
  } catch (error) {
    res.status(400).json({ ok: "false" });
  }
};

// 상세페이지
module.exports.detailPosts = async (req, res) => {
  const {detailId}  = req.params;

    const articles = await Articles.findOne({ id: Number(detailId) })

    res.json({
        articles
    });
}
// 수정하기를 들어갈 수 있는 권한확인 (수정하기 버튼을 눌렀을 때)
module.exports.detailPosts = async (req, res) => {
  const {detailId}  = req.params;

    const articles = await Articles.findOne({ id: Number(detailId) })

    res.json({
        articles
    });
}
// 게시물 수정
module.exports.detailPosts = async (req, res) => {
  const {detailId}  = req.params;

    const articles = await Articles.findOne({ id: Number(detailId) })

    res.json({
        articles
    });
}

// 게시물 삭제
module.exports.detailPosts = async (req, res) => {
  const {detailId}  = req.params;

    const articles = await Articles.findOne({ id: Number(detailId) })

    res.json({
        articles
    });
}