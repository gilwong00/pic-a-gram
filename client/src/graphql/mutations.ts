import gql from 'graphql-tag';

export const INCREMENT_LIKES = gql`
  mutation($id: String!) {
    incrementLikes(id: $id) {
      _id
      caption
      likes
      imageUrl
      comments {
        body
      }
    }
  }
`;

export const ADD_OR_UPDATE_PHOTO = gql`
  mutation($id: String, $caption: String!, $imageUrl: String!) {
    addOrUpdatePhoto(input: {
      id: $id,
      caption: $caption,
      imageUrl: $imageUrl
    }) {
      _id
      caption
      likes
      comments {
        body
      }
    }
  }
`