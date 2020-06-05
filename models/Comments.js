const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
