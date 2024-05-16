import { Grid } from '@mui/material';
import MainBar from '../../components/Header';
import {
	CadastroVoluntario,
	Voluntario
} from '../../components/VoluntarioForm';

export const VoluntarioCreateEditPage = () => {
	const handleFormSubmit = (voluntario: Voluntario) => {
		// Aqui você pode lidar com a submissão do formulário
		console.log(voluntario);
	};

	return (
		<>
			<MainBar />
			<Grid
				container
				spacing={2}
				padding={{ xs: '1rem 1.5rem', md: '2rem 20rem', lg: '2rem 30rem' }}
			>
				<CadastroVoluntario onSubmit={handleFormSubmit} />
			</Grid>
		</>
	);
};
