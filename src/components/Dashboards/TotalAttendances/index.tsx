import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
	data: number[];
}

const TotalAttendances: React.FC<Props> = ({ data }) => {
	const total = data.reduce((a, b) => a + b, 0);
	const formattedTotal = total.toLocaleString('de-DE');

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			style={{ minHeight: '100%' }}
		>
			<Typography variant="h6">Total de Atendimentos</Typography>
			<Typography variant="h2">{formattedTotal}</Typography>
		</Box>
	);
};

export default TotalAttendances;
