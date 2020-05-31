import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { IPhoto } from '.';

interface IProps {
  photo: IPhoto | null;
}

const PostForm = styled.form`
  
`;

const Post: React.FC<IProps> = ({ photo }) => {
  const [picture, setPicture] = useState<IPhoto>(photo ? photo : {
    name: '',
    caption: '',
    imageUrl: ''
  });

  const convertToBase65 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = err => reject(err);
    });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = await convertToBase65(file) as string;
      return setPicture({ ...picture, imageUrl });
    }

    setPicture({
      ...picture,
      [e.target.name]: e.target.value
    });
  };

  const handleAddEdit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // perform validation

    if (photo) {
      // dispatch update mutation
    }
    else {
      // dispatch create mutation
    }
  }

  return (
    // style this up
    <PostForm onSubmit={handleAddEdit}>
      <label htmlFor='name'>Name</label>
      <input name='name' value={picture.name} onChange={handleChange} />
      <label htmlFor='caption'>Caption</label>
      <input name='caption' value={picture.caption} onChange={handleChange} />
      <label htmlFor='image'>Image</label>
      <input name='caption'  onChange={handleChange} type='file' />
      <button>{photo ? 'Update' : 'Add'}</button>
    </PostForm>
  );
}

export default Post;
