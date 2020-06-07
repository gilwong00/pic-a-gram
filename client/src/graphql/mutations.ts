import gql from 'graphql-tag';

export const INCREMENT_LIKES = gql`
  mutation($id: ID!) {
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
  mutation($id: ID, $caption: String!, $imageUrl: String!) {
    addOrUpdatePhoto(
      input: { id: $id, caption: $caption, imageUrl: $imageUrl }
    ) {
      _id
      caption
      likes
      comments {
        body
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation($body: String!, $author: String!, $photoId: ID!) {
    addComment(input: { body: $body, author: $author, photoId: $photoId }) {
      _id
      body
      author
      dateCreated
    }
  }
`;
