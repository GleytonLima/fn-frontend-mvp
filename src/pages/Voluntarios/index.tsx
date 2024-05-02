import {
	Box,
	Button,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import MainBar from '../../components/Header';
import { VoluntariosFilterForm } from '../../components/VoluntariosFilterForm';
import { MissaoTipo } from '../../models/missao';
import { Voluntario } from '../../models/voluntario';
import { listarVoluntariosElegiveisPorMissao } from '../../services/voluntarios.service';

export const Voluntarios = () => {
	const [voluntarios, setVoluntarios] = useState([]);
	const [filtros, setFiltros] = useState({
		missaoTipo: null as MissaoTipo | null,
		nome: ''
	});
	useEffect(() => {
		listarVoluntariosElegiveisPorMissao(filtros).then((voluntarios) => {
			console.log('Fim da requisição de voluntários');
			setVoluntarios(voluntarios);
		});
	}, [filtros]);

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Typography variant="h5" component="h2">
					Voluntários
				</Typography>
				<VoluntariosFilterForm
					onSubmit={(payload) => {
						setFiltros(
							payload as { missaoTipo: MissaoTipo | null; nome: string }
						);
						console.log('Filtros', payload);
						return Promise.resolve();
					}}
				/>
				<br />
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Nome</TableCell>
								<TableCell align="center">Gradução</TableCell>
								<TableCell align="center">Especialização</TableCell>
								<TableCell align="center">Email</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{voluntarios.map((v: Voluntario) => (
								<TableRow
									key={v.nomeCompleto}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{v.nomeCompleto}
									</TableCell>
									<TableCell align="center">{v.graduacaoFormacao}</TableCell>
									<TableCell align="center">{v.especializacao}</TableCell>
									<TableCell align="center">{v.email}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Grid
				display={'grid'}
				alignItems={'start'}
				justifyItems={'center'}
				gap={'20px'}
				padding={{ xs: '1rem 1.5rem', md: '2rem 20rem', lg: '2rem 30rem' }}
			>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						console.log('Notificar voluntários');
					}}
				>
					Nova Missão: Notificar Voluntários
				</Button>
			</Grid>
		</>
	);
};
