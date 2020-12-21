import { gql } from '@apollo/client';

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    title
    content
    created_at
    username
    user_id
    likes {
      id
      post_id
      user_id
    }
    comments {
      id
      comment
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
