import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    username
    user_id
    content
    title
    likes {
      id
    }
    created_at
    image {
      image_src
    }
  }
`;
