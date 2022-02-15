const Posts = require('../models/posts');

module.exports.makeLikes = async (req, res) => {
  try {
    const { user } = res.locals;
    const { postId } = req.body;

    await Posts.updateOne(
      { id: Number(postId) },
      { $set: { like_count: like_count + 1, like_id:like_id.push(user.loginId)} 
    });
    
    const thePost  = await Posts.findOne({id: Number(postId)})
    const like_count = thePost.like_count

    res.json({ like_count });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

module.exports.deleteLikes = async (req, res) => {
  try {
    const { user } = res.locals;
    const { postId } = req.body;

    await Posts.updateOne(
      { id: Number(postId) },
      { $set: { like_count: like_count - 1, like_id:like_id.filter((i) => i !== user.loginId)} 
    });
    
    const thePost = await Posts.findOne({id: Number(postId)})
    const like_count = thePost.like_count

    res.json({ like_count });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};
