const Posts = require('../models/posts');

// 메인페이지로 줄 정보 (게시물 전체) - 50완
module.exports.getPosts = async (req, res) => {
  const sortByLike = await Posts.find().sort('-like_count').exec();
  const sortByNew = await Posts.find().sort('-id').exec();
  

  res.json({
    sortByLike,
    sortByNew,
  });
};

// 새로운 게시물 생성 (db에 저장) - id가 어떤 변수 명으로 저장되는지 찾아야함
module.exports.makePosts = async (req, res) => {
  try {
    // const { user } = res.locals;
    const { title, contents } = req.body;
    const thumbnail = `/images/${req.file.filename}`;
    console.log(thumbnail)
    
    await Posts.create({
      // loginId: user.loginId,
      thumbnail,
      contents,
      title,
      like_count : 0, 
      is_like : 'false',
      like_id : []
    });

    res.json({ ok: 'true' });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

// 상세페이지 - 완료
module.exports.detailPosts = async (req, res) => {
  const { postId } = req.params;

  const post = await Posts.findOne({ id: Number(postId) });

  res.json({
    post,
  });
};
// 수정하기를 들어갈 수 있는 권한확인 (수정하기 버튼을 눌렀을 때)
module.exports.goModifyPosts = async (req, res) => {
  const { user } = res.locals;
  const { postId } = req.params;

  const post = await Posts.findOne({ id: Number(postId) });

  if (post.loginId === user.loginId) {
    res.json({
      ok: 'true',
    });
  } else {
    res.json({
      ok: 'false',
    });
  }
};

// 게시물 수정 (수정완료 버튼을 누럿을 때)
module.exports.modifyPosts = async (req, res) => {
  const { postId } = req.params;
  const { user } = res.locals;
  const { title, thumbnail, contents } = req.body;

  const post = await Posts.findOne({ id: Number(postId) });

  if (post.loginId === user.loginId) {
    await Posts.updateOne(
      { id: Number(postId) },
      { $set: { contents, title, thumbnail } }
    );

    res.json({ ok: 'true' });
  } else {
    res.json({ ok: 'false' });
  }
};

// 게시물 삭제하기
module.exports.deletePosts = async (req, res) => {
  const { postId } = req.params;
  const { user } = res.locals;

  const post = await Articles.findOne({ id: Number(postId) });
  if (post.loginId === user.loginId) {
    await Articles.deleteOne({ id: Number(postId) });
    res.json({ ok: 'true' });
  } else {
    res.json({ ok: 'false' });
  }
};
