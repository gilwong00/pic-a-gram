import gql from 'graphql-tag';

export const INCREMENT_LIKES = gql`
  mutation($id: String!) {
    incrementLikes(id: $id) {
      _id
      name
      caption
      likes
      imageUrl
      comments {
        body
      }
    }
  }
`;