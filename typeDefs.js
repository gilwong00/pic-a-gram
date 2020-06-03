const { gql } = require('apollo-server');

module.exports = gql`
  type Photo {
		_id: String
    caption: String
    likes: Int
    imageUrl: String
    comments: [Comment]
  }

  type Comment {
    body: String
    photoId: Int
    dateCreated: String
  }

  input AddNewPhotoInput {
    id: String
    caption: String
    imageUrl: String
  }

  input UpdatePhotoInput {
    _id: String
    caption: String
    imageUrl: String
  }

  type Query {
    getPhotos: [Photo!]
    getPhoto(id: String): Photo!
  }

  type Mutation {
    addOrUpdatePhoto(input: AddNewPhotoInput!): Photo
    incrementLikes(id: String!): Photo!
    updatePhoto(input: UpdatePhotoInput!): Photo!
  }
`;
