import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $userId: Int!
    $username: String!
    $imageSrc: String!
  ) {
    create(
      input: {
        title: $title
        content: $content
        user_id: $userId
        username: $username
        imageSrc: $imageSrc
      }
    ) {
      id
      title
      content
      user_id
      likes {
        id
      }
      username
      created_at
      image {
        image_src
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: Int!, $userId: Int!) {
    like(postId: $postId, userId: $userId) {
      id
      user_id
      post_id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($postId: Int!, $userId: Int!) {
    unlike(postId: $postId, userId: $userId)
  }
`;
