const { array } = require('joi');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postsSchema = new mongoose.Schema({
  loginId: String,
  title: String,
  contents: String,
  thumbnail: String,
  like_count: Number,
  is_like: String,
  like_id: Array,
});

postsSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Posts', postsSchema);
