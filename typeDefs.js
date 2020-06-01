const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
		_id: String
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
    caption: String
    imageUrl: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post,
    incrementLikes(id: String!) : Post
  }
`;
