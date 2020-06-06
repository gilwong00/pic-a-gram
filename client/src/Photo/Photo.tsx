import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GET_PHOTO } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Loading } from '../UI';
import { IComment } from "."

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const CommentsSection = styled.div`
  border: 1px solid black;
  height: 398px;
  width: 400px;
`;


const CommentsContainer = styled.div`
  height: 250px;
  overflow-y: scroll;
`;

const Image = styled.img`
  height: 400px;
`;

const InputContainer = styled.div`
  position: relative;
  padding: 30px;
  top: 10%;
`

const Input = styled.input`
  width: 100%;
  margin: 0 auto;
`

const Photo: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PHOTO, {
    variables: {
      id
    }
  });


  if (loading) {
    return <Loading />;
  };

  return (
    <>
      {data && data.getPhoto && (
        <PhotoContainer>
          <Image src={data.getPhoto.imageUrl} alt={data.getPhoto._id} />
          <CommentsSection>
            {data.getPhoto.comments.length > 0 ? <CommentsContainer>
              {/* render comments */}
              {data.getPhoto.comments.map((comment: IComment) => {
                return <p key={comment._id}>{comment.body}</p>
              })}
            </CommentsContainer> : <p>No comments yet</p>}

            {/* make these always at the bottom */}
            <InputContainer>
              <Input type='text' placeholder='enter a comment' />
              <Input type='text' placeholder='your name' />
            </InputContainer>

          </CommentsSection>
        </PhotoContainer>
      )}
    </>
  )
}

export default Photo;
