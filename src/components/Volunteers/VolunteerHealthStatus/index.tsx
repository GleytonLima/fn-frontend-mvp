import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Typography
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSnackbar } from 'notistack';
import {
	addVolunteerHealthStatus,
	listVolunteerHealthStatuses,
	removeVolunteerHealthStatus
} from '../../../services/volunteers/volunteer-health-statuses.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const healthStatusSchema = z.object({
	id: z.number(),
	name: z.string()
});

const volunteerHealthStatusSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	healthStatus: healthStatusSchema,
	updated_at: z.string().optional()
});

export type VolunteerHealthStatusSchema = z.infer<
	typeof volunteerHealthStatusSchema
>;

interface VolunteerHealthStatusProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerHealthStatus = ({
	volunteer
}: VolunteerHealthStatusProps) => {
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid }
	} = useForm<VolunteerHealthStatusSchema>({
		resolver: zodResolver(volunteerHealthStatusSchema),
		defaultValues: undefined
	});
	const [vaccines, setHealthStatuses] = useState<{
		data: {
			id: number;
			volunteer_id: number;
			health_status_id: number;
			updated_at: string;
			health_status: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			id: number;
			volunteer_id: number;
			health_status_id: number;
			updated_at: string;
			health_status: { id: number; name: string };
		}[],
		limit: 5,
		total: 0,
		offset: 0
	});
	const { t } = useTranslation();

	const handlePageChange = useCallback(
		(params: GridPaginationModel) => {
			if (params.pageSize <= 0) {
				return;
			}
			if (!volunteer?.id) {
				return;
			}
			setLoading(true);
			listVolunteerHealthStatuses(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setHealthStatuses(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerHealthStatus = (row: {
		id: number;
		volunteer_id: number;
		health_status_id: number;
		updated_at: string;
		health_status: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeVolunteerHealthStatus(row.id)
			.then(() => {
				handlePageChange({
					page: 0,
					pageSize: 5
				});
				enqueueSnackbar(t('commons.deleteSuccess'), { variant: 'success' });
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar(t('commons.deleteError'), { variant: 'error' });
			});
	};

	const columns: GridColDef<(typeof vaccines.data)[number]>[] = [
		{
			field: 'healthStatus',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.health_status.name;
			}
		},
		{
			field: 'date_administered',
			headerName: t('VolunteerHealthStatus.updated_at'),
			flex: 1,
			renderCell: (params) => {
				return new Date(params.row.updated_at).toLocaleString();
			}
		},
		{
			field: 'actions',
			headerName: t('commons.actions'),
			flex: 0.35,
			renderCell: (params) => {
				return (
					<>
						<IconButton
							aria-label="more"
							aria-controls="long-menu"
							aria-haspopup="true"
							onClick={(event) => {
								event.stopPropagation();
								setAnchorEl(event.currentTarget);
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
									setOpenDeleteConfirmation({
										open: true,
										value: params.row
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

	const onSubmit = useCallback(
		(data: FieldValues) => {
			if (!volunteer?.id) {
				return;
			}
			addVolunteerHealthStatus({
				id: data.id,
				volunteer_id: volunteer.id,
				healthStatus: data.healthStatus,
				updated_at: new Date().toISOString()
			})
				.then(() => {
					reset();
					enqueueSnackbar(t('commons.addSuccess'), { variant: 'success' });
					handlePageChange({
						page: 0,
						pageSize: 5
					});
				})
				.catch((err) => {
					console.error(err);
					enqueueSnackbar(t('commons.addError'), { variant: 'error' });
				});
		},
		[handlePageChange, volunteer?.id, reset]
	);

	useEffect(() => {
		handlePageChange({
			page: 0,
			pageSize: 5
		});
	}, [handlePageChange]);

	return (
		<>
			<Typography variant="h6" component="h2" gutterBottom>
				{t('VolunteerHealthStatus.title')}
			</Typography>
			<DialogConfirmation
				currentState={{
					open: openDeleteConfirmation.open,
					value: openDeleteConfirmation.value
				}}
				model="delete"
				onClose={(e) => {
					setOpenDeleteConfirmation({
						open: false
					});
					if (e) {
						handleRemoveVolunteerHealthStatus(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="healthStatus"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="health_status"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.health_status'),
										placeholder: ''
									}}
									onChange={(newValue) => {
										field.onChange(newValue);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={!isValid}
						>
							{t('commons.add')}
						</Button>
					</Grid>
				</Grid>
			</form>
			<div style={{ height: 250 }}>
				<DataGrid
					rows={vaccines.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={vaccines.total}
					pageSizeOptions={[1, 3, 10]}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('VolunteerHealthStatus.noRowsLabel'),
						MuiTablePagination: {
							labelDisplayedRows
						}
					}}
					onPaginationModelChange={(params) => {
						handlePageChange({
							page: params.page,
							pageSize: params.pageSize
						});
					}}
					slots={{ noRowsOverlay: CustomNoRowsOverlay }}
					sx={{ '--DataGrid-overlayHeight': '300px' }}
				/>
			</div>
		</>
	);
};
