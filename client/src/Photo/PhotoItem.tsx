import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IPhoto } from '.';
import { INCREMENT_LIKES } from '../graphql/mutations';
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

const ActionItem = styled.div`
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

const HeartOption = styled.div<Pick<Props, 'hasLikes'>>`
  display: inline-block;
  font-size: 30px;
  padding-right: 5px;
  cursor: pointer;
  color: ${(props: Props) => (props.hasLikes ? 'red' : '')};
`;

const CommentOption = styled.div`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const PhotoItem: React.FC<IProps> = ({ photo }) => {
  const [incrementLikes] = useMutation(INCREMENT_LIKES);

  return (
    <StyledFigure>
      <Link to={`/photo/${photo._id}`}>
        <Image src={photo.imageUrl ?? ''} />
      </Link>
      <figcaption>
        <p>{photo.caption}</p>
        <ActionsContainer>
          <ActionItem>
            <HeartOption hasLikes={photo.likes > 0} onClick={() => incrementLikes({ variables: { id: photo._id } })}>
              {photo.likes > 0 ? '♥' : '♡'}
            </HeartOption>
            <span>{photo.likes}</span>
          </ActionItem>
          <ActionItem>
            <CommentOption onClick={() => console.log('hit')}>
              <span role='img' aria-label='speech'>💬 {photo.comments?.length}</span>
            </CommentOption>
          </ActionItem>
        </ActionsContainer>
      </figcaption>
    </StyledFigure>
  );
};

export default PhotoItem;
