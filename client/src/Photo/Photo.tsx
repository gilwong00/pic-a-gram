import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GET_PHOTO } from '../graphql/queries';
import { ADD_COMMENT } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Loading } from '../UI';
import { IComment } from '.';

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
`;

// make these look nicer
const Input = styled.input`
  width: 100%;
  margin: 0 auto;
`;

const Photo: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PHOTO, {
    variables: {
      id
    }
  });

  const [addComment] = useMutation(ADD_COMMENT);

  const handleSubmit = async () => {
    if (!comment && !author) {
      // display some error
      return;
    }

    await addComment({
      variables: { body: comment, author, photoId: data.getPhoto._id }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data && data.getPhoto && (
        <PhotoContainer>
          <Image src={data.getPhoto.imageUrl} alt={data.getPhoto._id} />
          <CommentsSection>
            {data.getPhoto.comments.length > 0 ? (
              <CommentsContainer>
                {/* render comments */}
                {data.getPhoto.comments.map((comment: IComment) => {
                  // make a styled component out of this. display comment, author and date added
                  return <p key={comment._id}>{comment.body}</p>;
                })}
              </CommentsContainer>
            ) : (
              <p>No comments yet</p>
            )}

            <InputContainer>
              <Input
                type='text'
                placeholder='Your Name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAuthor(e.target.value)
                }
                value={author}
              />
              <Input
                type='text'
                placeholder='Comment'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
                value={comment}
              />
            </InputContainer>
          </CommentsSection>
        </PhotoContainer>
      )}
    </>
  );
};

export default Photo;
