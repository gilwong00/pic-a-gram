import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`	

const PhotoGrid: React.FC = () => {
	return (
		<Grid>
			<p>Grid</p>
		</Grid>
	)
}

export default PhotoGrid
