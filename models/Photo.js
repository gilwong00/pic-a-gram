const mongoose = require('mongoose');

const photoSchema = mongoose.Schema(
  {
    caption: {
      type: String
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    },
    imageUrl: {
      type: String
    },
    comments: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    }
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
