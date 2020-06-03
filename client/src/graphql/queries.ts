import gql from 'graphql-tag';

export const GET_PHOTOS = gql`
	query {
		getPhotos {
			_id
			caption
			imageUrl
			likes
			comments {
				body
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
				body
			}
		}
	}
`