import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import { Volunteer } from '../../../models/volunteer';
import { listVolunteersByMissionType } from '../../../services/volunteers/volunteer.service';

export const VoluntariosTable = () => {
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { t } = useTranslation();

	const navigate = useNavigate();
	const handleEdit = (id: number) => {
		navigate(`/voluntarios/${id}/edit`);
	};

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
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

	const handlePageChange = (params: { page: number; pageSize: number }) => {
		console.log('Início da requisição de voluntários', params);
		setLoading(true);
		listVolunteersByMissionType({
			limit: params.pageSize,
			offset: params.page
		}).then((voluntarios) => {
			console.log('Fim da requisição de voluntários');
			setVoluntarios(voluntarios);
			setLoading(false);
		});
	};
	useEffect(() => {
		handlePageChange({
			page: 0,
			pageSize: 10
		});
	}, []);

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
			field: 'volunteer_degree',
			headerName: t('Volunteer.degree'),
			flex: 1,
			renderCell: (params) => {
				return params.row.volunteer_degree
					.map((degree) => degree.degree.name)
					.join(', ');
			}
		},
		{
			field: 'location',
			headerName: t('Volunteer.location'),
			flex: 1,
			renderCell: (params) => {
				return `${params.row.location?.name}${
					params.row.location?.location
						? ` - ${params.row.location?.location?.name}`
						: ''
				}`;
			}
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
							<MenuItem onClick={() => handleEdit(params.row.id)}>
								{t('commons.edit')}
							</MenuItem>
							<MenuItem onClick={handleClose}>{t('commons.delete')}</MenuItem>
						</Menu>
					</>
				);
			}
		}
	];

	return (
		<>
			<Box sx={{ p: 4 }}>
				<Box sx={{ height: 371, width: '100%' }}>
					<Typography variant="h5" component="h2">
						{t('VoluntariosTable.title')}
					</Typography>
					<DataGrid
						rows={voluntarios.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={voluntarios.total}
						pageSizeOptions={[1, 10, 50]}
						disableRowSelectionOnClick
						localeText={{
							noRowsLabel: t('VoluntariosTable.noRowsLabel'),
							MuiTablePagination: {
								labelDisplayedRows
							}
						}}
						onPaginationModelChange={handlePageChange}
						onRowClick={(params) => {
							handleEdit(params.row.id);
						}}
					/>
				</Box>
			</Box>
		</>
	);
};
