module.exports = {
  Query: {
    getPhotos: async () => {
      const { Photo } = ctx;
      const photos = await Photo.find({});
      return photos;
    },

    getPhoto: async (_, args, ctx) => {
      const { Photo } = ctx;
      const query = { _id: args.id }
      return await Photo.find(query).populate({ path: 'comments', model: 'Comment' });
    }
  },

  Mutation: {
    addNewPhoto: async (_, args, ctx) => {
      const { Photo } = ctx;
      const newPhoto = new Photo({ ...args.input }).save();
      return newPhoto;
    },

    incrementLikes: async (_, args, ctx) => {
      const { Photo } = ctx;
      const query = {
        _id: args.id
      };

      return await Photo.findOneAndUpdate(
        query,
        { $inc: { likes: 1 } },
        { new: true }
      );
    },

    updatePhoto: async (_, args, ctx) => {
      const { Photo } = ctx;
      const query = { _id: args.input.id };
      return await Photo.findOneAndUpdate(
        query, 
        { 
          $set: { caption: args.input.caption, imageUrl: args.input.imageUrl }
        }, 
        { new: true }
      );
    }
  },
};
