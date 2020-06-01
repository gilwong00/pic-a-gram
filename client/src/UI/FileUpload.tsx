import React, { useRef } from 'react'
import styled from 'styled-components';

interface IProps {
	imageSrc: string | null,
	handleImage: () => any
};

interface Prop {
	imageSrc: string
}

const FileSelectorContainer = styled.div<Prop>`
	border: 1px dashed black;
	height: 200px;
	width: 200px;
	background-repeat: no-repeat;
	background-size: ${(prop: Prop) => prop.imageSrc ? 'cover' : ''};
	background-image: ${(prop: Prop) => prop.imageSrc ? prop.imageSrc : ''};
`;

const Label = styled.label`
	display: flex;
	justify-content: center;
	font-size: 100px;
	text-align: center;
`;

const Text = styled.p`
	text-align: center;
`

const FileUpload: React.FC<IProps> = ({ imageSrc, handleImage }) => {
	const inputEl = useRef<HTMLInputElement>(null);

	return (
		<FileSelectorContainer imageSrc={imageSrc} onClick={() => inputEl.current?.click()}>
			<>
				<Label>
					+
				</Label>
				<Text>Click here to add a photo</Text>
			</>
			<input type='file' hidden ref={inputEl} onChange={handleImage} />
		</FileSelectorContainer>
	)
}

export default FileUpload;
