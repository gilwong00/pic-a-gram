const { gql } = require('apollo-server');

module.exports = gql`
  type Photo {
    _id: ID
    caption: String
    likes: Int
    imageUrl: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    body: String
    author: String
    photoId: String
    dateCreated: String
  }

  input AddNewPhotoInput {
    id: ID
    caption: String!
    imageUrl: String!
  }

  input CommentInput {
    body: String!
    author: String!
    photoId: ID!
  }

  type Query {
    getPhotos: [Photo!]
    getPhoto(id: String): Photo!
  }

  type Mutation {
    addOrUpdatePhoto(input: AddNewPhotoInput!): Photo
    incrementLikes(id: String!): Photo!
    addComment(input: CommentInput!): Comment!
  }
`;
