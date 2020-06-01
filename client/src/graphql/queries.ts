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