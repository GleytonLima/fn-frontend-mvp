import { Box, Grid, Typography } from '@mui/material';
import MainBar from '../../components/Header';
import SupplyMedicineTable from '../../components/SupplyMedicineTable';

const SupplyMedicinesPage = () => {
	const suppliesMedicines = [
		{
			id: 1,
			nome: 'Paracetamol',
			categoria: 'Medicamento',
			quantidade: 100,
			unidade: 'caixas',
			validade: new Date(2024, 11, 31),
			fornecedor: 'Farmácia Central'
		},
		{
			id: 2,
			nome: 'Álcool Gel',
			categoria: 'Insumo',
			quantidade: 50,
			unidade: 'litros',
			validade: new Date(2025, 5, 15),
			fornecedor: 'Distribuidora XYZ'
		},
		{
			id: 3,
			nome: 'Seringa',
			categoria: 'Insumo',
			quantidade: 200,
			unidade: 'unidades',
			validade: new Date(2026, 2, 28),
			fornecedor: 'Distribuidora XYZ'
		},
		{
			id: 4,
			nome: 'Máscara N95',
			categoria: 'EPI',
			quantidade: 100,
			unidade: 'unidades',
			validade: new Date(2026, 2, 28),
			fornecedor: 'Distribuidora XYZ'
		},
		{
			id: 5,
			nome: 'Luva de procedimento',
			categoria: 'EPI',
			quantidade: 200,
			unidade: 'pares',
			validade: new Date(2026, 2, 28),
			fornecedor: 'Distribuidora XYZ'
		},
		{
			id: 6,
			nome: 'Avental descartável',
			categoria: 'EPI',
			quantidade: 100,
			unidade: 'unidades',
			validade: new Date(2026, 2, 28),
			fornecedor: 'Distribuidora XYZ'
		}
	];

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5" gutterBottom>
						Insumos e Medicamentos
					</Typography>
				</Grid>
				<SupplyMedicineTable suppliesMedicines={suppliesMedicines} />
			</Box>
		</>
	);
};

export default SupplyMedicinesPage;
