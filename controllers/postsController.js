const Post = require('../models/Post');

const getPosts = async (req, res) => {
  const posts = await Post.find({});
  return res.status(200).json(posts);
};

const createPost = async (req, res) => {
  try {
    const { body } = req;
    const newPost = new Post({
      name: body.name,
      caption: body.caption,
    });

    const result = await newPost.save();
    console.log('res\n', result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
	getPosts,
	createPost
};
