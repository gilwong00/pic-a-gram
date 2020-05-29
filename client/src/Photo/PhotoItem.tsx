import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPhoto } from '.';
import { useMutation } from '@apollo/react-hooks';

interface IProps {
  photo: IPhoto;
}

const StyledFigure = styled.figure`
	width: 260px;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid lightgray;
  background: white;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.05);
	position: relative;
`;

const Button = styled.button`
  border: 2px solid lighten(grey, 90%);
  background: transparent;
	width: 48%;
  display: inline-block;
  line-height: 2;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  transition: all 0.2s;
`;

const ButtonControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Image = styled.img`
  width: calc(100% + 4rem);
  margin-left: -2rem;
  margin-top: -2rem;
  max-width: none;
`;

const SpeechBubble = styled.span`
  width: 1.5rem;
  height: 1.25rem;
  background: blue;
  display: inline-block;
  border-radius: 50%;
  position: relative;
`;

const PhotoItem: React.FC<IProps> = ({ photo }) => {
  return (
    <StyledFigure>
      <Link to={`/post/${photo._id}`}>
        <Image src={photo.imageUrl || ''} />
      </Link>
      <figcaption>
        <p>{photo.caption}</p>
        <ButtonControls>
          <Button>♥ {photo.likes}</Button>
          <Button>
            <SpeechBubble /> {photo.comments ? photo.comments.length : 0}
          </Button>
        </ButtonControls>
      </figcaption>
    </StyledFigure>
  );
};

export default PhotoItem;
