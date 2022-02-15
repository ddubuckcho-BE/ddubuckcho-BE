const Posts = require('../models/posts');

module.exports.makeLikes = async (req, res) => {
  try {
    const { user } = res.locals;
    const { post_id } = req.params;
    console.log(post_id)
    
    const thePost = await Posts.findOne({id: Number(post_id)})
    const count = thePost.like_count
    const id = thePost.like_id.push(user.loginId)
    console.log(count, id)
    
    await Posts.updateOne(
      { id: Number(post_id) },
      { $set: { like_count: count += 1 , like_id: id} 
    });
    
    const findPost  = await Posts.findOne({id: Number(post_id)})
    const like_count = findPost.like_count

    console.log(like_count)
    res.json({ like_count });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};

module.exports.deleteLikes = async (req, res) => {
  try {
    const { user } = res.locals; 
    const { post_id } = req.params;
    console.log(post_id)

    await Posts.updateOne(
      { id: Number(post_id) },
      { $set: { like_count: like_count -= 1, like_id:like_id.filter((i) => i !== user.loginId)} 
    });
    
    const thePost = await Posts.findOne({id: Number(post_id)})
    const like_count = thePost.like_count

    console.log(like_count)
    res.json({ like_count });
  } catch (error) {
    res.status(400).json({ ok: 'false' });
  }
};
