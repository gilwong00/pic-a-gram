import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { GET_PHOTO } from '../graphql/queries';
import { ADD_COMMENT } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Loading, Button, ButtonLabel } from '../UI';
import { IComment } from '.';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 0 0 12px rgba(0, 0, 0, 0.05);
  max-width: 910px;
  margin: 0 auto;
  border: 1px solid #edeeed;
`;

const PhotoCaption = styled.p`
  padding-left: 10px;
`;

const CommentsSection = styled.div`
  height: 398px;
  width: 500px;
`;

const CommentsContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
`;

const Comment = styled.div`
  width: 98%;
  border-bottom: 1px solid lightgrey;
`;

const Image = styled.img`
  height: 400px;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  top: 10%;
`;

const Input = styled.input`
  width: 88%;
  font-size: 14px;
  padding: 10px 10px 10px 12px;
  display: block;
  border: none;
  border-bottom: 1px solid #757575;
  margin-bottom: 10px;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled(Button)`
  margin: 0 35px 0 0;
  float: right;
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

  const [addComment] = useMutation(ADD_COMMENT, {
    awaitRefetchQueries: true,
    refetchQueries: () => [{ query: GET_PHOTO, variables: { id } }],
    onCompleted: () => {
      setComment('');
      setAuthor('');
    }
  });

  const handleSubmit = async () => {
    if (!comment && !author) {
      return;
    }

    return await addComment({
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
          <div>
            <Image src={data.getPhoto.imageUrl} alt={data.getPhoto._id} />
            <PhotoCaption>{data.getPhoto.caption}</PhotoCaption>
          </div>

          <CommentsSection>
            <CommentsContainer>
              {data.getPhoto.comments.map((comment: IComment) => {
                return (
                  <Comment key={comment._id}>
                    <p>
                      <strong style={{ padding: '0 10px' }}>
                        {comment.author}:
                      </strong>
                      {comment.body}
                    </p>
                  </Comment>
                );
              })}
            </CommentsContainer>

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
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setComment(e.target.value)
                }
                onKeyDown={async (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    await handleSubmit();
                  }
                }}
              />
              <SubmitButton onClick={handleSubmit}>
                <ButtonLabel>Submit</ButtonLabel>
              </SubmitButton>
            </InputContainer>
          </CommentsSection>
        </PhotoContainer>
      )}
    </>
  );
};

export default Photo;
