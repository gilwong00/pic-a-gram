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
      post_id
      user_id
    }
    created_at
    image {
      image_src
    }
  }
`;

export const POST_LIKES_FRAGMENT = gql`
  fragment PostLikesFragment on Post {
    id
    likes {
      id
    }
  }
`;
