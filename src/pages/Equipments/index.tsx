import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EquipmentTable from '../../components/EquipmentTable';
import MainBar from '../../components/Header';

const EquipmentsPage = () => {
	const { t } = useTranslation();
	const equipments = [
		{
			id: 1,
			nome: 'Respirador Modelo A',
			tipo: 'Respirador',
			quantidade: 10,
			status: 'Operacional',
			localizacao: 'Ala A, Sala 101'
		},
		{
			id: 2,
			nome: 'Monitor Cardíaco',
			tipo: 'Monitor Cardíaco',
			quantidade: 5,
			status: 'Operacional',
			localizacao: 'Ala B, Sala 202'
		},
		{
			id: 3,
			nome: 'Máscara Facial',
			tipo: 'Máscara',
			quantidade: 100,
			status: 'Em manutenção',
			localizacao: 'Almoxarifado'
		},
		{
			id: 4,
			nome: 'Desfibrilador',
			tipo: 'Desfibrilador',
			quantidade: 2,
			status: 'Operacional',
			localizacao: 'Ala C, Sala 303'
		}
	];

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Grid item xs={12}>
					<Typography variant="h5" gutterBottom>
						{t('EquipmentsPage.title')}
					</Typography>
				</Grid>
				<EquipmentTable equipments={equipments} />
			</Box>
		</>
	);
};

export default EquipmentsPage;
