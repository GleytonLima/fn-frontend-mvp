import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { FormEventHandler, useState } from 'react';
import ReactJson from 'react-json-view';
import { MissaoTipo } from '../../models/missao';

export type MissaoTipoFromProps = {
	missao: MissaoTipo;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onCancel: () => void;
};

export const MissaoTipoForm = (missaoProps: MissaoTipoFromProps) => {
	const [missao, setMissao] = useState<MissaoTipo>(missaoProps.missao);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMissao({ ...missao, tipo: event.target.value } as MissaoTipo);
	};
	return (
		<>
			<Box component="section" sx={{ p: 2 }}>
				<form onSubmit={missaoProps.onSubmit}>
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
									onClick={missaoProps.onCancel}
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
