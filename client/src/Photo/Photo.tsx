import React from 'react';
import styled from 'styled-components';
import { IPhoto } from '.';

interface IProps {
  photo: IPhoto;
}

const StyledFigure = styled.figure`
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid lightgray;
  background: white;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.03);
  position: relative;
`;

const Button = styled.button`
  border: 2px solid lighten(grey, 90%);
  background: none;
  flex-basis: 48%;
  display: inline-block;
  line-height: 2;
  text-decoration: none;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  color: blue;
  transition: all 0.2s;
  box-sizing: padding-box;
`;

const ButtonControls = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Photo: React.FC<IProps> = ({ photo }) => {
  return (
    <StyledFigure>
      <figcaption>
        <p>{photo.caption}</p>
        <ButtonControls>
          <Button>&hearts; {photo.likes}</Button>
        </ButtonControls>
      </figcaption>
    </StyledFigure>
  );
};

export default Photo;
