import { Box } from '@mui/material';
import MainBar from '../../components/Header';
import {
	CadastroVoluntario,
	Voluntario
} from '../../components/VoluntarioForm';

export const VoluntarioCreateEditPage = () => {
	const handleFormSubmit = (voluntario: Voluntario) => {
		console.log('VoluntarioCreateEditPage', voluntario);
	};

	return (
		<>
			<MainBar />
			<Box sx={{ p: 4 }}>
				<CadastroVoluntario onSubmit={handleFormSubmit} />
			</Box>
		</>
	);
};
