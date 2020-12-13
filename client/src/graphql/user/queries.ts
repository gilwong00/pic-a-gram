import { gql } from '@apollo/client';
import { USER_FRAGMENT } from 'graphql/fragments/user';

export const ME = gql`
  query me {
    me {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
