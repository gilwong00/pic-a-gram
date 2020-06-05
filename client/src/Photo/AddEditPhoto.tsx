import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { GET_PHOTOS, GET_PHOTO } from '../graphql/queries';
import { ADD_OR_UPDATE_PHOTO } from '../graphql/mutations';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { IPhoto } from '.';
import { FileUpload, Loading } from '../UI';

interface ILabelProps {
  text: string;
}

const PhotoForm = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

// move these to their own file
const Fieldset = styled.div`
  position: relative;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;

  &:focus {
    outline: none;
  }
`;

const Label = styled.label<ILabelProps>`
  color: #552586;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;

  ${Input}:focus ~ & {
    top: -20px;
    font-size: 14px;
    color: #5264ae;
  }

  ${Input}:valid ~ & {
    top: ${(props: ILabelProps) =>
      props.text && props.text.length > 0 ? '-20px' : '0px'};
    font-size: ${(props: ILabelProps) =>
      props.text && props.text.length > 0 ? '14px' : '18px'};
  }
`;
// move these to their own file

const Button = styled.button`
  position: relative;
  display: block;
  margin: 30px auto;
  padding: 0;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  background-color: #ff1744;
  color: #ecf0f1;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ff1744;
  }

  &:focus {
    background-color: #ff1744;
  }
`;

const ButtonLabel = styled.span`
  display: block;
  padding: 12px 24px;
  color: #fff;
  font-size: 16px;
`;

const AddEditPhoto: React.FC = () => {
  const [picture, setPicture] = useState<Omit<IPhoto, 'likes'>>({
    caption: '',
    imageUrl: '',
  });

  const history = useHistory();
  const { id } = useParams();
  const [getPhoto, { loading }] = useLazyQuery(GET_PHOTO, {
    onCompleted: (data) => {
      setPicture(data.getPhoto);
    },
  });
  const [addOrUpdatePhoto] = useMutation(ADD_OR_UPDATE_PHOTO, {
    // update(cache, { data: { addNewPhoto } }) {
    //   const res: any = cache.readQuery({ query: GET_PHOTOS });

    //   cache.writeQuery({
    //     query: GET_PHOTOS,
    //     data: { getPhotos: res.getPhotos.concat([addNewPhoto]) },
    //   });
    // },
    awaitRefetchQueries: true,
    refetchQueries: () => [{ query: GET_PHOTOS }],
    onCompleted: () => history.push('/'),
  });

  useEffect(() => {
    if (id) {
      getPhoto({ variables: { id } });
    }
  }, [id, getPhoto]);

  const convertToBase65 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = (await convertToBase65(file)) as string;
      return setPicture({ ...picture, imageUrl });
    }

    return setPicture({
      ...picture,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // perform validation
    const variables =
      picture && picture._id
        ? {
            id: picture._id,
            caption: picture.caption,
            imageUrl: picture.imageUrl,
          }
        : { caption: picture.caption, imageUrl: picture.imageUrl };
    addOrUpdatePhoto({
      variables,
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PhotoForm onSubmit={handleAddEdit}>
          <Fieldset>
            <FileUpload
              imageSrc={picture?.imageUrl ?? ''}
              handleImage={handleChange}
            />
          </Fieldset>
          <Fieldset>
            <Input
              id='caption'
              name='caption'
              value={picture.caption}
              onChange={handleChange}
              type='text'
            />
            <Label htmlFor='caption' text={picture.caption}>
              Caption
            </Label>
          </Fieldset>
          <Button type='submit'>
            <ButtonLabel>
              {picture && picture._id ? 'Update' : 'Add'}
            </ButtonLabel>
          </Button>
        </PhotoForm>
      )}
    </>
  );
};

export default AddEditPhoto;
