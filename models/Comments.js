const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dateCreated: {
    type: Date,
    default: new Date().toISOString(),
  },
});

const Post = mongoose.model('Comment', commentSchema);

module.exports = Post;
