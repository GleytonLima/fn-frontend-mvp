import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import MainBar from '../../components/Commons/Header';
import MissionConfigCard from '../../components/Missions/MissionConfigCard';

const MissionViewPage: React.FC = () => {
	const configs = [
		{ title: 'Voluntários', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Atendimentos', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Operações', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Abrigos', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Doações', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Recursos', imageUrl: 'https://via.placeholder.com/150' },
		{ title: 'Integrações', imageUrl: 'https://via.placeholder.com/150' }
	];

	return (
		<>
			<MainBar />

			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5" gutterBottom>
						Missão 05/2024 - Rio Grande do Sul
					</Typography>
				</Grid>
				<Grid container spacing={2} justifyContent="center">
					{configs.map((config) => (
						<Grid item xs={12} sm={6} key={config.title}>
							<MissionConfigCard
								title={config.title}
								imageUrl={config.imageUrl}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default MissionViewPage;
