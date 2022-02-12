const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = new mongoose.Schema({
  loginId: {
    type: String,
    
  },
  title: {
    type: String,
    
  },
  contents: {
    type: String,
    
  },
  thumbnail: {
    type: String,
    
  },
  like_count: {
    type: Number,
    
  },
  is_like: {
    type: String,
    
  },
});

postsSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Posts', postsSchema);
