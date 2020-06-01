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

export const ADD_NEW_PHOTO = gql`
  mutation($caption: String!, $imageUrl: String!) {
    addNewPhoto(input: {
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