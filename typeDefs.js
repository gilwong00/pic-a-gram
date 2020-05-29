const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    name: String
    caption: String
    likes: Int
    imageUrl: String
    comments: [Comment]
  }

  type Comment {
    body: String
    postId: Int
    dateCreated: String
  }

  type Query {
    getPosts: [Post!]
  }

  input CreatePostInput {
    name: String
    caption: String
    imageUrl: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
  }
`;
