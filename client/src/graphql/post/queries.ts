import { gql } from '@apollo/client';

export const GET_POST = gql`
  query($pageNum: Int!) {
    posts(pageNum: $pageNum) {
      posts {
        id
        title
        content
        created_at
        username
        user_id
        likes {
          id
          user_id
          post_id
        }
        image {
          image_src
        }
      }
      totalPages
    }
  }
`;
