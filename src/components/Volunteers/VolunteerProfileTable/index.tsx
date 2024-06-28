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
import { MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../../hooks/window-dimensions';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import { listVolunteerProfiles } from '../../../services/volunteer-profile.service';
import { VolunteerProfileSchema } from '../VolunteerProfileForm';
export const VolunteerProfileTable = () => {
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [pageParams, setPageParams] = useState({ page: 0, pageSize: 5 });
	const [sortParams, setSortParams] = useState<GridSortItem[]>([
		{ field: 'name', sort: 'asc' }
	]);
	const { width } = useWindowDimensions();
	const { t } = useTranslation();

	const navigate = useNavigate();
	const handleEdit = (id?: number) => {
		navigate(`/volunteer-profiles/${id}/edit`);
	};
	const [volunteerProfiles, setVolunteerProfile] = useState<{
		data: VolunteerProfileSchema[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as VolunteerProfileSchema[],
		limit: 10,
		total: 0,
		offset: 0
	});

	const handlePageChange = (params: { page: number; pageSize: number }) => {
		setLoading(true);
		setPageParams(params);
		listVolunteerProfiles({
			limit: params.pageSize,
			offset: params.page,
			sortingParams: sortParams?.map((sort) => ({
				field: sort.field,
				sort: sort.sort === 'asc' ? 'asc' : 'desc'
			}))
		})
			.then((volunteerProfiles) => {
				setVolunteerProfile(volunteerProfiles);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
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
		listVolunteerProfiles({
			limit: pageParams.pageSize,
			offset: pageParams.page,
			sortingParams: model.map((sort) => ({
				field: sort.field,
				sort: sort.sort === 'asc' ? 'asc' : 'desc'
			}))
		}).then((results) => {
			setVolunteerProfile(results);
			setLoading(false);
		});
	};

	useEffect(() => {
		handlePageChange({
			page: 0,
			pageSize: 10
		});
	}, []);

	const columns: GridColDef<(typeof volunteerProfiles.data)[number]>[] = [
		{
			field: 'name',
			headerName: t('VolunteerProfile.name'),
			flex: 1
		},
		{
			field: 'action',
			headerName: t('commons.actions'),
			sortable: false,
			flex: 0.35,
			renderCell: (params) => {
				const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
				const open = Boolean(anchorEl);
				const handleClick = (event: MouseEvent<HTMLElement>) => {
					event.stopPropagation();
					setAnchorEl(event.currentTarget);
				};
				const handleClose = () => {
					setAnchorEl(null);
				};
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
						</Menu>
					</>
				);
			}
		}
	];

	return (
		<>
			<Box sx={{ p: 4 }}>
				<Typography variant="h5" component="h2">
					{t('VolunteerProfileTable.title')}
				</Typography>
				<Box sx={{ pb: 2, pt: 2, height: 371, width: '100%' }}>
					<DataGrid
						rows={volunteerProfiles.data}
						columns={columns}
						columnVisibilityModel={{
							name: true,
							volunteerProfile_type: width > 600,
							action: true
						}}
						disableColumnMenu
						disableColumnResize
						loading={loading}
						paginationMode="server"
						sortingMode="server"
						rowCount={volunteerProfiles.total}
						pageSizeOptions={[1, 10, 50]}
						disableRowSelectionOnClick
						initialState={{
							pagination: { paginationModel: pageParams },
							sorting: { sortModel: sortParams }
						}}
						localeText={{
							noRowsLabel: t('VolunteerProfileTable.noRowsLabel'),
							MuiTablePagination: {
								labelDisplayedRows
							}
						}}
						onPaginationModelChange={handlePageChange}
						onSortModelChange={handleSortChange}
						onRowClick={(params) => {
							handleEdit(params.row.id);
						}}
					/>
				</Box>
			</Box>
		</>
	);
};
