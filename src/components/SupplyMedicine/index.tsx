import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export interface SupplyMedicine {
	id: number;
	nome: string;
	categoria: string;
	quantidade: number;
	unidade: string;
	validade: Date;
	fornecedor: string;
}

interface SupplyMedicineDetailsProps {
	supplyMedicine: SupplyMedicine;
}

const SupplyMedicineDetails: React.FC<SupplyMedicineDetailsProps> = ({
	supplyMedicine
}) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const [nome, setNome] = useState(supplyMedicine.nome);
	const [categoria, setCategoria] = useState(supplyMedicine.categoria);
	const [quantidade, setQuantidade] = useState(supplyMedicine.quantidade);
	const [unidade, setUnidade] = useState(supplyMedicine.unidade);
	const [validade, setValidade] = useState(supplyMedicine.validade);
	const [fornecedor, setFornecedor] = useState(supplyMedicine.fornecedor);

	console.log(id);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Handle form submission here
	};

	return (
		<form autoComplete="new-password" onSubmit={handleSubmit}>
			<Typography variant="h6">{t('SupplyMedicineDetails.title')}</Typography>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.name')}
					value={nome}
					onChange={(e) => setNome(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.category')}
					value={categoria}
					onChange={(e) => setCategoria(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.quantity')}
					value={quantidade}
					onChange={(e) => setQuantidade(Number(e.target.value))}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.unit')}
					value={unidade}
					onChange={(e) => setUnidade(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.expiryDate')}
					type="date"
					value={validade}
					onChange={(e) => setValidade(new Date(e.target.value))}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('SupplyMedicine.supplier')}
					value={fornecedor}
					onChange={(e) => setFornecedor(e.target.value)}
					fullWidth
				/>
			</Box>
			<Grid item xs={12}>
				<Box display="flex" justifyContent="space-between">
					<Button variant="contained" color="primary" type="submit">
						{t('save')}
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							navigate('/supplies-medicines');
						}}
					>
						{t('cancel')}
					</Button>
				</Box>
			</Grid>
		</form>
	);
};

export default SupplyMedicineDetails;
