const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    likes: {
			type: Number,
			required: true,
			default: 0
    },
    imageUrl: {
      type: String,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment',
		},
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
