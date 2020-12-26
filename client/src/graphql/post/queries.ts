import { gql } from '@apollo/client';
import { POST_FRAGMENT } from 'graphql/fragments/post';

export const GET_POSTS = gql`
  query($pageNum: Int!) {
    posts(pageNum: $pageNum) {
      posts {
        ...PostFragment
        comments {
          id
          comment
          user_id
        }
      }
      totalPages
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_POST = gql`
  query getPost($postId: Int!) {
    post(postId: $postId) {
      ...PostFragment
      comments {
        id
        comment
        created_at
        user {
          id
          username
          avatar_color
        }
      }
    }
  }
  ${POST_FRAGMENT}
`;
