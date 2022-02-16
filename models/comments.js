const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentsSchema = new mongoose.Schema({
  id: String,
  loginId: String,
  name: String,
  comment: String,
});

commentsSchema.plugin(AutoIncrement, { inc_field: 'commentId' });

module.exports = mongoose.model('Comments', commentsSchema);
