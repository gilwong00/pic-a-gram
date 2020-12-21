import { gql } from '@apollo/client';
import { POST_FRAGMENT } from 'graphql/fragments/post';

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
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
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

export const COMMENT_POST = gql`
  mutation commentPost($postId: Int!, $userId: Int!, $comment: String!) {
    comment(postId: $postId, userId: $userId, comment: $comment) {
      id
      user_id
      comment
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
