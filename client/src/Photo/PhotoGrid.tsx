import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PhotoItem, IPhoto } from '.';
import { Loading, AddPhotoButton } from '../UI';
import { GET_PHOTOS } from '../graphql/queries';
import { useLazyQuery } from '@apollo/react-hooks';

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: auto;
`;

const PhotoGrid: React.FC = () => {
  const [getPhotos, { loading, data }] = useLazyQuery(GET_PHOTOS);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data && data.getPhotos && (
        <Grid>
          {data.getPhotos.map((photo: IPhoto) => {
            return <PhotoItem key={photo._id} photo={photo} />;
          })}
        </Grid>
      )}
      <AddPhotoButton />
    </>
  );
};

export default PhotoGrid;
