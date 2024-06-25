import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import {
	DataGrid,
	GridCallbackDetails,
	GridColDef,
	GridSortItem,
	GridSortModel
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useWindowDimensions from '../../../hooks/window-dimensions';
import { BasicTable } from '../../../models/basic-table';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import { listBasicTableWithPagination } from '../../../services/basic-tables.service';
import { BasicTableFilterForm } from '../BasicTableFilterForm';
import { DialogConfirmation } from '../DialogConfirmation';

export const BasicTableComponent = ({
	handleEdit,
	handleDelete
}: {
	handleEdit: (data: BasicTable) => void;
	handleDelete: (data: BasicTable) => void;
}) => {
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [pageParams, setPageParams] = useState({ page: 0, pageSize: 5 });
	const [sortParams, setSortParams] = useState<GridSortItem[]>([
		{ field: 'name', sort: 'asc' }
	]);
	const { width } = useWindowDimensions();
	const [searchParams] = useSearchParams();
	const { t } = useTranslation();
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
		title?: string;
		message?: string;
	});

	const tableName = searchParams.get('tableName') || '';
	const nameFilter = searchParams.get('name') || '';

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
		setPageParams(params);
		listBasicTableWithPagination({
			tableName,
			name: nameFilter || '',
			limit: params.pageSize,
			offset: params.page,
			sortingParams: sortParams
		})
			.then((results) => {
				setBasic(results);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar(`${t('commons.error')}: ${error}`, {
					variant: 'error'
				});
			});
	};

	const handleSortChange = (
		model: GridSortModel,
		_: GridCallbackDetails<any>
	) => {
		setSortParams(model);
		setLoading(true);
		listBasicTableWithPagination({
			tableName,
			name: nameFilter || '',
			limit: pageParams.pageSize,
			offset: pageParams.page,
			sortingParams: model
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
			sortable: false,

			headerName: t('commons.actions'),
			flex: width < 600 ? 0.35 : 0.1,
			renderCell: (params) => {
				const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
				const open = Boolean(anchorEl);
				return (
					<>
						<IconButton
							aria-label="more"
							aria-controls="long-menu"
							aria-haspopup="true"
							onClick={(event) => {
								setAnchorEl(event.currentTarget);
								event.stopPropagation();
							}}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="long-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={() => setAnchorEl(null)}
						>
							<MenuItem
								onClick={() => {
									setAnchorEl(null);
									handleEdit(params.row);
								}}
							>
								{t('commons.edit')}
							</MenuItem>
							<MenuItem
								onClick={() => {
									setAnchorEl(null);
									setOpenDeleteConfirmation({
										open: true,
										value: params.row,
										title: t('BasicTable.deleteTitle'),
										message: t('BasicTable.deleteMessage', {
											name: params.row.name
										})
									});
								}}
							>
								{t('commons.delete')}
							</MenuItem>
						</Menu>
					</>
				);
			}
		}
	];

	return (
		<>
			<DialogConfirmation
				currentState={{
					open: openDeleteConfirmation.open,
					value: openDeleteConfirmation.value,
					title: openDeleteConfirmation.title,
					message: openDeleteConfirmation.message
				}}
				onClose={(e) => {
					setOpenDeleteConfirmation({
						open: false
					});
					if (e) {
						handleDelete(e);
					}
				}}
			/>
			<Box sx={{ p: 4 }}>
				<Box sx={{ height: 371, width: '100%' }}>
					<Typography variant="h5" component="h2">
						{t(`BasicTable.${tableName}`)}
					</Typography>
					<BasicTableFilterForm />
					<DataGrid
						rows={results.data}
						columns={columns}
						disableColumnMenu
						disableColumnResize
						loading={loading}
						paginationMode="server"
						sortingMode="server"
						rowCount={results.total}
						pageSizeOptions={[1, 10, 50]}
						disableRowSelectionOnClick
						initialState={{
							pagination: { paginationModel: pageParams },
							sorting: { sortModel: sortParams }
						}}
						localeText={{
							noRowsLabel: t('BasicTable.noRowsLabel'),
							MuiTablePagination: {
								labelDisplayedRows
							}
						}}
						onSortModelChange={handleSortChange}
						onPaginationModelChange={handlePageChange}
						onRowClick={(params) => {
							handleEdit(params.row);
						}}
					/>
				</Box>
			</Box>
		</>
	);
};
