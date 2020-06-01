import React, { useRef } from 'react';
import styled from 'styled-components';

interface IProps {
  imageSrc: string;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

interface Props {
  imageSrc: string;
}

const FileSelectorContainer = styled.div<Props>`
  border: 1px dashed black;
  height: 200px;
  width: 300px;
  background-repeat: no-repeat;
  background-size: ${(prop: Props) => (prop.imageSrc ? 'cover' : '')};
  background-image: url(${(prop: Props) =>
    prop.imageSrc ? prop.imageSrc : ''});
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  font-size: 100px;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
`;

const FileUpload: React.FC<IProps> = ({ imageSrc, handleImage }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const handleClick = () => inputEl.current?.click();

  return (
    <>
      {!imageSrc ? (
        <FileSelectorContainer imageSrc={imageSrc} onClick={handleClick}>
          <>
            <Label>+</Label>
            <Text>Click here to add a photo</Text>
          </>
        </FileSelectorContainer>
      ) : (
        <Image src={imageSrc} alt='new photo' onClick={handleClick} />
      )}
      <input type='file' hidden ref={inputEl} onChange={handleImage} />
    </>
  );
};

export default FileUpload;
