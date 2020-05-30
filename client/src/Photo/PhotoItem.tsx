import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPhoto } from '.';
import { useMutation } from '@apollo/react-hooks';

interface IProps {
  photo: IPhoto;
}

interface Props {
  hasLikes?: boolean;
  hasComments?: boolean;
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

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
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
  background: transparent;
  display: inline-block;
  border-radius: 50%;
  position: relative;
  border: 1px solid black;
`;

const HeartOption = styled.div<Pick<Props, 'hasLikes'>>`
  display: inline-block;
  font-size: 30px;
  padding-right: 5px;
  cursor: pointer;
  color: ${(props: Props) => (props.hasLikes ? 'red' : '')};
`;

const PhotoItem: React.FC<IProps> = ({ photo }) => {
  const [likes, setLikes] = useState<number>(photo.likes ?? 0);
  return (
    <StyledFigure>
      <Link to={`/post/${photo._id}`}>
        <Image src={photo.imageUrl ?? ''} />
      </Link>
      <figcaption>
        <p>{photo.caption}</p>
        <ActionsContainer>
          <ActionButton>
            {likes > 0 ? (
              <HeartOption hasLikes>♥</HeartOption>
            ) : (
              // change this to call an add likes mutation
              <HeartOption
                onClick={() => setLikes((prevState) => (prevState += 1))}
              >
                ♡
              </HeartOption>
            )}

            <span>{photo.likes}</span>
          </ActionButton>
          {/* <ActionButton>
            <SpeechBubble /> {photo.comments ? photo.comments.length : 0}
          </ActionButton> */}
        </ActionsContainer>
      </figcaption>
    </StyledFigure>
  );
};

export default PhotoItem;
