import React from 'react';
import styled from 'styled-components';
import { PhotoItem, IPhoto } from '.';
import { Loading, AddPostButton } from '../UI';
import { GET_POST } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
`;

const PhotoGrid: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POST);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid>
        {data.getPosts.map((post: IPhoto) => {
          return <PhotoItem key={post._id} photo={post} />;
        })}
      </Grid>
      <AddPostButton />
    </>
  );
};

export default PhotoGrid;
