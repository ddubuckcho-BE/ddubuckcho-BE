const Posts = require('../models/posts');

module.exports.makeLikes = async (req, res) => {
  try {
    const { user } = res.locals;
    const { post_id } = req.params;
    
    const thePost = await Posts.findOne({id: Number(post_id)})
    const count = thePost.like_count
    
    await Posts.updateOne(
      { id: Number(post_id) },
      /*{ $set: { like_count: count += 1}}*/  { $push: { like_id: user.loginId } }
    );
    

 
    res.json({ });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

module.exports.deleteLikes = async (req, res) => {
  try {
    const { user } = res.locals; 
    const { post_id } = req.params;

    // const thePost = await Posts.findOne({id: Number(post_id)})

    await Posts.updateOne(
      { id: Number(post_id) },
      { $pull: { like_id: user.loginId}
    });
    
    // const thePost = await Posts.findOne({id: Number(post_id)})
    
    res.json({ });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};
