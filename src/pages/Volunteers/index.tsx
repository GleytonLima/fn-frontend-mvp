import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';
import { VoluntariosTable } from '../../components/Volunteers/VolunteerTable';

export const VoluntariosPage = () => {
	const navigate = useNavigate();
	const handleEdit = (id: number) => {
		navigate(`/voluntarios/${id}/edit`);
	};
	return (
		<>
			<MainBar />
			<VoluntariosTable handleSelect={handleEdit} />
			<Box>
				<Grid item xs={12}>
					<Box display="flex" justifyContent="center">
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
