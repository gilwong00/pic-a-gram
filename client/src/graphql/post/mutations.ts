import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $userId: ID!
    $username: String!
    $image_src: String
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
      username
      imageSrc
    }
  }
`;
