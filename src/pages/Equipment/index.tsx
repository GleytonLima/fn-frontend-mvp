import { Box } from '@mui/material';
import EquipmentDetails from '../../components/Equipment';
import MainBar from '../../components/Header';

const EquipmentPage = () => {
	const item = {
		id: 4,
		nome: 'Desfibrilador',
		tipo: 'Desfibrilador',
		quantidade: 2,
		status: 'Operacional',
		localizacao: 'Ala C, Sala 303'
	};

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<EquipmentDetails equipment={item} />
			</Box>
		</>
	);
};

export default EquipmentPage;
