import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Box,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VoluntariosFilterForm } from '../../components/VoluntariosFilterForm';
import { MissaoTipo } from '../../models/missao';
import { Voluntario } from '../../models/voluntario';
import { listarVoluntariosElegiveisPorMissao } from '../../services/voluntarios.service';

interface Filtros {
	missaoTipo: MissaoTipo | null;
	nome: string;
}

export const VoluntariosTable = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const navigate = useNavigate();
	const handleEdit = (id: string) => {
		navigate(`/voluntarios/${id}/edit`);
	};

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
	const [filtros, setFiltros] = useState<Filtros>({
		missaoTipo: null,
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
								<TableCell align="center">Ações</TableCell>
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
									<TableCell align="center">
										<IconButton
											aria-label="more"
											aria-controls="long-menu"
											aria-haspopup="true"
											onClick={handleClick}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											id="long-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
										>
											<MenuItem onClick={handleClose}>Detalhes</MenuItem>
											<MenuItem onClick={() => handleEdit(v.email)}>
												Editar
											</MenuItem>
											<MenuItem onClick={handleClose}>Excluir</MenuItem>
										</Menu>
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
