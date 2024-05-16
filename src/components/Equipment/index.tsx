import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export interface Equipment {
	id: number;
	nome: string;
	tipo: string;
	quantidade: number;
	status: string;
	localizacao: string;
}

interface EquipmentDetailsProps {
	equipment: Equipment;
}

const EquipmentDetails: React.FC<EquipmentDetailsProps> = ({ equipment }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const [nome, setNome] = useState(equipment.nome);
	const [tipo, setTipo] = useState(equipment.tipo);
	const [quantidade, setQuantidade] = useState(equipment.quantidade);
	const [status, setStatus] = useState(equipment.status);
	const [localizacao, setLocalizacao] = useState(equipment.localizacao);

	console.log(id);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		// Lidar com a submissão do formulário aqui
	};

	return (
		<form onSubmit={handleSubmit}>
			<Typography variant="h6">{t('EquipmentDetails.title')}</Typography>
			<Box marginBottom={2}>
				<TextField
					label={t('Equipment.name')}
					value={nome}
					onChange={(e) => setNome(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('Equipment.type')}
					value={tipo}
					onChange={(e) => setTipo(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('Equipment.quantity')}
					value={quantidade}
					onChange={(e) => setQuantidade(Number(e.target.value))}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('Equipment.status')}
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					fullWidth
				/>
			</Box>
			<Box marginBottom={2}>
				<TextField
					label={t('Equipment.location')}
					value={localizacao}
					onChange={(e) => setLocalizacao(e.target.value)}
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
							navigate('/equipments');
						}}
					>
						{t('cancel')}
					</Button>
				</Box>
			</Grid>
		</form>
	);
};

export default EquipmentDetails;
