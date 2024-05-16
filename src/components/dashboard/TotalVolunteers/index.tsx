import { Box, Typography } from '@mui/material';
import React from 'react';

const TotalVolunteers: React.FC = () => {
	const totalVolunteers: number = 2500; // Dados fictícios

	// Formata o número com um ponto como separador de milhar
	const formattedTotalVolunteers = totalVolunteers.toLocaleString('de-DE');

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			style={{ minHeight: '100%' }}
		>
			<Typography variant="h6">Total de Voluntários</Typography>
			<Typography variant="h2">{formattedTotalVolunteers}</Typography>
		</Box>
	);
};

export default TotalVolunteers;
