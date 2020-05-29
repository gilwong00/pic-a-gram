module.exports = {
  Query: {
    getPosts: async (root, args, ctx) => {
      const { Post } = ctx;
      const posts = await Post.find({});
      return posts;
    },
  },

  Mutation: {
    createPost: async (root, args, ctx) => {
      const { Post } = ctx;
      const newPost = new Post({ ...args.input }).save();
      return newPost;
    },
  },
};
