import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BasicTable } from '../../../models/basic-table';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import { listBasicTableWithPagination } from '../../../services/basic-tables.service';
import { BasicTableFilterForm } from '../BasicTableFilterForm';

export const BasicTableComponent = () => {
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [searchParams] = useSearchParams();
	const open = Boolean(anchorEl);
	const { t } = useTranslation();

	const tableName = searchParams.get('tableName') || '';
	const nameFilter = searchParams.get('name') || '';

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
	const [results, setBasic] = useState<{
		data: BasicTable[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as BasicTable[],
		limit: 10,
		total: 0,
		offset: 0
	});

	const handlePageChange = (params: { page: number; pageSize: number }) => {
		setLoading(true);
		listBasicTableWithPagination({
			tableName,
			name: nameFilter || '',
			limit: params.pageSize,
			offset: params.page
		}).then((results) => {
			setBasic(results);
			setLoading(false);
		});
	};
	useEffect(() => {
		handlePageChange({
			page: 0,
			pageSize: 5
		});
	}, [tableName, nameFilter]);

	const columns: GridColDef<(typeof results.data)[number]>[] = [
		{
			field: 'name',
			headerName: t('Volunteer.name'),
			flex: 1
		},
		{
			field: 'action',
			headerName: t('commons.actions'),
			flex: 1,
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
						{t(`BasicTable.${tableName}`)}
					</Typography>
					<BasicTableFilterForm />
					<DataGrid
						rows={results.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={results.total}
						pageSizeOptions={[1, 10, 50]}
						disableRowSelectionOnClick
						initialState={{
							pagination: { paginationModel: { pageSize: 5, page: 0 } }
						}}
						localeText={{
							noRowsLabel: t('BasicTable.noRowsLabel'),
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
