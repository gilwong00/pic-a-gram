import gql from 'graphql-tag';

export const GET_POST = gql`
	query {
		getPosts {
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