import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MissaoTipo } from '../../models/missao';
import { labelDisplayedRows } from '../../models/pagination-translate';
import { Volunteer } from '../../models/voluntario';
import { listVolunteersByMissionType } from '../../services/voluntarios.service';

interface Filtros {
	missaoTipo: MissaoTipo | null;
	nome: string;
}

export const VoluntariosTable = () => {
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { t } = useTranslation();

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
	const [voluntarios, setVoluntarios] = useState<{
		data: Volunteer[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as Volunteer[],
		limit: 10,
		total: 0,
		offset: 0
	});
	const [filtros, setFiltros] = useState<Filtros>({
		missaoTipo: null,
		nome: ''
	});
	useEffect(() => {
		setLoading(true);
		listVolunteersByMissionType(filtros).then((voluntarios) => {
			console.log('Fim da requisição de voluntários');
			setVoluntarios(voluntarios);
			setLoading(false);
		});
	}, [filtros]);

	const columns: GridColDef<(typeof voluntarios.data)[number]>[] = [
		{
			field: 'full_name',
			headerName: t('Volunteer.name'),
			flex: 1
		},
		{
			field: 'email',
			headerName: t('Volunteer.email'),
			flex: 1
		},
		{
			field: 'action',
			headerName: t('commons.actions'),
			renderCell: (params) => {
				return (
					<>
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
							<MenuItem onClick={() => handleEdit(params.row.email)}>
								Editar
							</MenuItem>
							<MenuItem onClick={handleClose}>Excluir</MenuItem>
						</Menu>
					</>
				);
			}
		}
	];

	return (
		<>
			<Box sx={{ p: 4 }}>
				<Box sx={{ height: 400, width: '100%' }}>
					<Typography variant="h5" component="h2">
						{t('VoluntariosTable.title')}
					</Typography>
					<DataGrid
						rows={voluntarios.data}
						columns={columns}
						loading={loading}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5
								}
							}
						}}
						autoPageSize
						pageSizeOptions={[1, 10, 50]}
						disableRowSelectionOnClick
						localeText={{
							MuiTablePagination: {
								labelDisplayedRows
							}
						}}
					/>
				</Box>
			</Box>
		</>
	);
};
