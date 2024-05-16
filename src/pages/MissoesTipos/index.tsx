import {
	Box,
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
import { Link } from 'react-router-dom';
import MainBar from '../../components/Header';
import { MissaoTipo } from '../../models/missao';
import { listarMissoesTipos } from '../../services/missoes.service';

export const MissoesTiposPage = () => {
	const [missoes, setMissoes] = useState([]);
	useEffect(() => {
		listarMissoesTipos().then((voluntarios) => {
			console.log('Fim da requisição de missoes');
			setMissoes(voluntarios);
		});
	}, []);

	return (
		<>
			<MainBar />
			<Box component="section" sx={{ p: 2 }}>
				<Typography variant="h5" component="h2">
					Missões - Tipos
				</Typography>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Nome</TableCell>
								<TableCell align="center">Descrição</TableCell>
								<TableCell align="center">Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{missoes.map((m: MissaoTipo) => (
								<TableRow
									key={m._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row" align="center">
										{m.nome}
									</TableCell>
									<TableCell component="th" scope="row" align="center">
										{m.descricao}
									</TableCell>
									<TableCell align="center">
										<Link to={`/missoes-tipos/${m.id}/edit`} state={m}>
											Editar
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};
