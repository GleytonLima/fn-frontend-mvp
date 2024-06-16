import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Header';
import { VoluntariosTable } from '../../components/VolunteerTable';

export const VoluntariosPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<MainBar />
			<VoluntariosTable />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center" gap="20px">
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate('/voluntarios/create');
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
