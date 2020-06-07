module.exports = {
  Query: {
    getPhotos: async (_, args, ctx) => {
      const { Photo } = ctx;
      return await Photo.find({});
    },

    getPhoto: async (_, args, ctx) => {
      const { Photo } = ctx;
      const query = { _id: args.id };

      return await Photo.findOne(query).populate({
        path: 'comments',
        model: 'Comment'
      });
    }
  },

  Mutation: {
    addOrUpdatePhoto: async (_, args, ctx) => {
      const { Photo } = ctx;
      const { input } = args;

      if (input.id) {
        const query = { _id: args.input.id };

        return await Photo.findOneAndUpdate(
          query,
          {
            $set: {
              caption: args.input.caption,
              imageUrl: args.input.imageUrl
            }
          },
          { new: true }
        );
      } else {
        const newPhoto = await new Photo({ ...args.input }).save();
        return newPhoto;
      }
    },

    incrementLikes: async (_, args, ctx) => {
      const { Photo } = ctx;
      const query = {
        _id: args.id
      };

      return await Photo.findOneAndUpdate(query, { $inc: { likes: 1 } });
    },

    addComment: async (_, args, ctx) => {
      const { Photo, Comment } = ctx;
      const query = { _id: args.input.photoId };
      const newComment = await new Comment({ ...args.input }).save();

      if (newComment._id) {
        await Photo.findOneAndUpdate(query, {
          $push: { comments: newComment._id }
        });
      }
      
      return newComment;
    }
  }
};
