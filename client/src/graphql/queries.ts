import gql from 'graphql-tag';

export const GET_PHOTOS = gql`
  query {
    getPhotos {
      _id
      caption
      imageUrl
      likes
      comments {
        _id
        body
        author
        dateCreated
      }
    }
  }
`;

export const GET_PHOTO = gql`
  query($id: String!) {
    getPhoto(id: $id) {
      _id
      caption
      imageUrl
      likes
      comments {
        _id
        body
        author
        dateCreated
      }
    }
  }
`;
