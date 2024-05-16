import { Box } from '@mui/material';
import MainBar from '../../components/Header';
import SupplyMedicineDetails from '../../components/SupplyMedicine';

const SupplyMedicinePage = () => {
	const supplyMedicine = {
		id: 2,
		nome: 'Álcool Gel',
		categoria: 'Insumo',
		quantidade: 50,
		unidade: 'litros',
		validade: new Date(2025, 5, 15),
		fornecedor: 'Distribuidora XYZ'
	};

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<SupplyMedicineDetails supplyMedicine={supplyMedicine} />
			</Box>
		</>
	);
};

export default SupplyMedicinePage;
