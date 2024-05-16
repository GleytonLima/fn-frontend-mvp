import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
	displacedData: number[];
}

const TotalDisplaced: React.FC<Props> = ({ displacedData }) => {
	const totalDisplaced = displacedData.reduce((a, b) => a + b, 0);
	const formattedTotal = totalDisplaced.toLocaleString('de-DE');

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			style={{ minHeight: '100%' }}
		>
			<Typography variant="h6">Total de Desabrigados</Typography>
			<Typography variant="h2">{formattedTotal}</Typography>
		</Box>
	);
};

export default TotalDisplaced;
