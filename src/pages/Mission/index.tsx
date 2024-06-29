import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import MainBar from '../../components/Commons/Header';
import MissionConfigCard from '../../components/Missions/MissionConfigCard';

const MissionViewPage: React.FC = () => {
	const configs = [
		{ id: 'team', title: 'Equipes', imageUrl: '/images/team.svg' },
		{ id: 'task', title: 'Tarefas', imageUrl: '/images/tasks.svg' },
		{
			id: 'communction',
			title: 'Comunicações',
			imageUrl: '/images/communications.svg'
		},
		{ id: 'report', title: 'Relatórios', imageUrl: '/images/reports.svg' },
		{ id: 'config', title: 'Configurações', imageUrl: '/images/config.svg' }
	];

	const handleSelection = (id: string) => {
		console.log(id);
	};

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
						<Grid item xs={6} sm={3} key={config.title}>
							<MissionConfigCard
								id={config.id}
								title={config.title}
								imageUrl={config.imageUrl}
								onClick={handleSelection}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default MissionViewPage;
