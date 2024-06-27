import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';
import { TrainingTable } from '../../components/Trainings/TrainingTable';

export const TrainingsPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<MainBar />
			<TrainingTable />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center" gap="20px">
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate('/trainings/create');
							}}
						>
							Cadastrar
						</Button>
					</Box>
				</Grid>
			</Box>
		</>
	);
};
