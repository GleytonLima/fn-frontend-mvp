import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Voluntario {
	id: number;
	nomeCompleto: string;
	graduacaoFormacao: string;
	especializacao: string;
	areaAtuacao: string;
	registroConselhoClasse: string;
	disponibilidadeViagens: string;
	cpf: string;
	uf: string;
	celularWhatsapp: string;
	email: string;
	dominioIdiomas: string[];
	linkCurriculoLattes: string;
}

interface CadastroVoluntarioProps {
	onSubmit: (voluntario: Voluntario) => void;
}

export const CadastroVoluntario = ({ onSubmit }: CadastroVoluntarioProps) => {
	const [voluntario, setVoluntario] = useState<Voluntario>({
		id: 0,
		nomeCompleto: '',
		graduacaoFormacao: '',
		especializacao: '',
		areaAtuacao: '',
		registroConselhoClasse: '',
		disponibilidadeViagens: '',
		cpf: '',
		uf: '',
		celularWhatsapp: '',
		email: '',
		dominioIdiomas: [''],
		linkCurriculoLattes: ''
	});
	const navigate = useNavigate();
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setVoluntario({
			...voluntario,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSubmit(voluntario);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Typography variant="h4" component="h2" gutterBottom>
				Formulário de Voluntário
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						name="nomeCompleto"
						label="Nome Completo"
						variant="outlined"
						fullWidth
						value={voluntario.nomeCompleto}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="graduacaoFormacao"
						label="Graduação/Formação"
						variant="outlined"
						fullWidth
						value={voluntario.graduacaoFormacao}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="especializacao"
						label="Especialização"
						variant="outlined"
						fullWidth
						value={voluntario.especializacao}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="areaAtuacao"
						label="Área de Atuação"
						variant="outlined"
						fullWidth
						value={voluntario.areaAtuacao}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="registroConselhoClasse"
						label="Registro no Conselho de Classe"
						variant="outlined"
						fullWidth
						value={voluntario.registroConselhoClasse}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="disponibilidadeViagens"
						label="Disponibilidade para Viagens"
						variant="outlined"
						fullWidth
						value={voluntario.disponibilidadeViagens}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="cpf"
						label="CPF"
						variant="outlined"
						fullWidth
						value={voluntario.cpf}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="uf"
						label="UF"
						variant="outlined"
						fullWidth
						value={voluntario.uf}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="celularWhatsapp"
						label="Celular/Whatsapp"
						variant="outlined"
						fullWidth
						value={voluntario.celularWhatsapp}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="email"
						label="Email"
						variant="outlined"
						fullWidth
						value={voluntario.email}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						name="linkCurriculoLattes"
						label="Link para Currículo Lattes"
						variant="outlined"
						fullWidth
						value={voluntario.linkCurriculoLattes}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			<Box mt={3}>
				<Grid container spacing={2}>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => navigate('/voluntarios')}
						>
							Cancelar
						</Button>
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" color="primary">
							Salvar
						</Button>
					</Grid>
				</Grid>
			</Box>
		</form>
	);
};
