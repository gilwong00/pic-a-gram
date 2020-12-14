import { gql } from '@apollo/client';

export const GET_POST = gql`
  query($pageNum: String!) {
    posts(pageNum: $pageNum) {
      results {
        id
        title
        content
        created_at
        username
        user_id
        likes {
          id
          user_id
        }
        image {
          image_src
        }
      }
      totalPages
    }
  }
`;
