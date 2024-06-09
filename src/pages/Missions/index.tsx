import { Box, Grid, Typography } from '@mui/material';
import MainBar from '../../components/Header';
import MissionsTable from '../../components/MissionsTable';

export const MissionsPage = () => {
	const missions = [
		{
			id: 1,
			name: 'Missão 01/2024',
			location: 'São Paulo',
			responseLevel: 'Nível I',
			startDate: new Date(2024, 0, 1),
			endDate: new Date(2024, 0, 31)
		},
		{
			id: 2,
			name: 'Missão 02/2024',
			location: 'Rio de Janeiro',
			responseLevel: 'Nível I',
			startDate: new Date(2024, 1, 1),
			endDate: new Date(2024, 1, 28)
		},
		{
			id: 3,
			name: 'Missão 03/2024',
			location: 'Minas Gerais',
			responseLevel: 'Nível II',
			startDate: new Date(2024, 2, 1),
			endDate: new Date(2024, 2, 31)
		},
		{
			id: 4,
			name: 'Missão 04/2024',
			location: 'Bahia',
			responseLevel: 'Nível III',
			startDate: new Date(2024, 3, 1),
			endDate: new Date(2024, 3, 30)
		},
		{
			id: 5,
			name: 'Missão 05/2024',
			location: 'Rio Grande do Sul',
			responseLevel: 'Nível IV',
			startDate: new Date(2024, 3, 1),
			endDate: new Date(2024, 3, 30)
		},
		{
			id: 6,
			name: 'Missão 06/2024',
			location: 'São Paulo',
			responseLevel: 'Nível I',
			startDate: new Date(2024, 3, 1),
			endDate: new Date(2024, 3, 30)
		}
	];
	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5" gutterBottom>
						Missões
					</Typography>
				</Grid>
				<MissionsTable missions={missions} />
			</Box>
		</>
	);
};
