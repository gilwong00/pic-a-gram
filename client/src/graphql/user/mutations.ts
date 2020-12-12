import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authUser($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      id
      username
      email
    }
  }
`