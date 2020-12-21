import { gql } from '@apollo/client';
import { POST_FRAGMENT } from 'graphql/fragments/post';

export const GET_POST = gql`
  query($pageNum: Int!) {
    posts(pageNum: $pageNum) {
      posts {
        ...PostFragment
      }
      totalPages
    }
  }
  ${POST_FRAGMENT}
`;
