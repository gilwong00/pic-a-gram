import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authUser($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      id
      username
      email
      avatar_color
    }
  }
`;

export const REGISTER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $avatarColor: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
        avatarColor: $avatarColor
      }
    ) {
      id
      username
      email
      avatar_color
    }
  }
`;

export const LOGOUT = gql`
  mutation logoff {
    logout
  }
`;
