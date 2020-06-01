import React from 'react';
import styled from 'styled-components';
import { PhotoItem, IPhoto } from '.';
import { Loading, AddPhotoButton } from '../UI';
import { GET_PHOTOS } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
`;

const PhotoGrid: React.FC = () => {
  const { loading, error, data } = useQuery(GET_PHOTOS);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid>
        {data.getPhotos.map((photo: IPhoto) => {
          return <PhotoItem key={photo._id} photo={photo} />;
        })}
      </Grid>
      <AddPhotoButton />
    </>
  );
};

export default PhotoGrid;
