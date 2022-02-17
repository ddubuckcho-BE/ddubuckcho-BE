const Posts = require('../models/posts');

module.exports.makeLikes = async (req, res) => {
  try {
    const { user } = res.locals;
    const { post_id } = req.params;
     
    await Posts.updateOne(
      { id: Number(post_id) },
      /*{ $set: { like_count: count += 1}}*/  { $push: { like_id: user.loginId } }
    );
    

 
    res.json({ ok: 'true' });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

module.exports.deleteLikes = async (req, res) => {
  try {
    const { user } = res.locals; 
    const { post_id } = req.params;

    await Posts.updateOne(
      { id: Number(post_id) },
      { $pull: { like_id: user.loginId}
    });
    
    
    res.json({ ok: 'true' });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};
