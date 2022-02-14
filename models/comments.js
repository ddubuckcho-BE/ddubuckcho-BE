const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentsSchema = new mongoose.Schema({
  id: String,
  name: String,
  comment: String,
});

postsSchema.plugin(AutoIncrement, { inc_field: 'commentId' });

module.exports = mongoose.model('Commentss', commentsSchema);
