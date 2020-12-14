import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authUser($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      id
      username
      email
    }
  }
`;

export const REGISTER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation logoff {
    logout
  }
`;
