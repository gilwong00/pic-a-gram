import React, { useState } from 'react';
import styled from 'styled-components';
import { IPhoto } from '.';

const PostForm = styled.form`
  
`;

interface IProps {
  photo: IPhoto;
}

const Post: React.FC<IProps> = ({ photo }) => {
  const [editMode, setEditMode] = useState<boolean>(photo ? true : false);
  return <div>Add a new post</div>;
}

export default Post;
