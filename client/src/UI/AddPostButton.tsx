import React from 'react';
import styled from 'styled-components';

const AddPost = styled.div`
  width: 70px;
  height: 70px;
  background-color: '#552586';
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 #666;
  font-size: 50px;
  line-height: 70px;
  color: '#fff';
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 50px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 14px 0 #666;
    transform: scale(1.05);
  }
`;

const AddPostButton: React.FC = () => {
  return (
    <AddPost />
  )
}

export default AddPostButton
