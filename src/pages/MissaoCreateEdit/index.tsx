import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { useLocation, useNavigate } from 'react-router-dom';
import MainBar from '../../components/Header';
import { MissaoTipo } from '../../models/missao';

export const MissaoTipoCreateEdit: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const missaoRecebida = location.state as MissaoTipo;
	const [missao, setMissao] = useState<MissaoTipo>(missaoRecebida);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMissao({ ...missao, tipo: event.target.value } as MissaoTipo);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(missao);
	};

	const handleCancel = () => {
		setMissao({ nome: '' } as MissaoTipo);
		navigate('/missoes-tipos');
	};

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								name="tipo"
								label="Tipo"
								value={missao.nome}
								onChange={handleInputChange}
								fullWidth
								margin="normal"
							/>
							<TextField
								name="descricao"
								label="Descrição"
								value={missao.descricao}
								onChange={handleInputChange}
								fullWidth
								margin="normal"
							/>
							<Box mb={2}>
								<Typography variant="h6" component="h6">
									Filtro de Voluntários
								</Typography>
								<br />
								<ReactJson
									src={missao.filtroVoluntarios}
									onEdit={(edit) => {
										setMissao({
											...missao,
											filtroVoluntarios: edit.updated_src
										});
									}}
								/>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Box display="flex" justifyContent="space-between">
								<Button variant="contained" color="primary" type="submit">
									Salvar
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={handleCancel}
								>
									Cancelar
								</Button>
							</Box>
						</Grid>
					</Grid>
				</form>
			</Box>
		</>
	);
};
