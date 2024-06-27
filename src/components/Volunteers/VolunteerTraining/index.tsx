import { zodResolver } from '@hookform/resolvers/zod';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Button,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	Typography
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from '@mui/x-date-pickers/locales';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerTraining,
	listVolunteerTrainings,
	removeVolunteerTraining
} from '../../../services/volunteers/volunteer-training.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const trainingSchema = z.object({
	id: z.number(),
	name: z.string()
});
const volunteerTrainingSchema = z.object({
	training: trainingSchema,
	date_completed: z.date()
});

export type VolunteerTrainingSchema = z.infer<typeof volunteerTrainingSchema>;

interface VolunteerTrainingProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { training?: string }) => void;
}

export const VolunteerTraining = ({ volunteer }: VolunteerTrainingProps) => {
	const [loading, setLoading] = useState(false);
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
	});
	const { enqueueSnackbar } = useSnackbar();
	const {
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<VolunteerTrainingSchema>({
		resolver: zodResolver(volunteerTrainingSchema),
		defaultValues: {
			training: undefined
		}
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [trainings, setTrainings] = useState<{
		data: {
			volunteer_id: number;
			training_id: number;
			training: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			training_id: number;
			training: { id: number; name: string };
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
			listVolunteerTrainings(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((trainings) => {
					setTrainings(trainings);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerTraining = (row: {
		volunteer_id: number;
		training_id: number;
		training: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeVolunteerTraining(row.volunteer_id, row.training_id)
			.then(() => {
				handlePageChange({
					page: 0,
					pageSize: 5
				});
				enqueueSnackbar(t('commons.deleteSuccess'), { variant: 'success' });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const columns: GridColDef<(typeof trainings.data)[number]>[] = [
		{
			field: 'training',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.training.name;
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
			addVolunteerTraining({
				volunteerId: volunteer.id,
				trainingId: data.training.id,
				date_completed: data.date_completed.toISOString()
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
				{t('VolunteerTraining.title')}
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
						handleRemoveVolunteerTraining(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={6}>
						<Controller
							name="training"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="training"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.training'),
										placeholder: ''
									}}
									onChange={(newValue) => {
										field.onChange(newValue);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name="date_completed"
							control={control}
							render={({ field }) => (
								<DatePicker
									label={t('VolunteerMedicalExam.examDate')}
									value={field.value ?? null}
									onError={(error) => {
										console.error(error);
									}}
									onChange={(newValue) => {
										field.onChange(newValue);
									}}
									format="dd/MM/yyyy"
									localeText={
										ptBR.components.MuiLocalizationProvider.defaultProps
											.localeText
									}
									slotProps={{ textField: { size: 'small' } }}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
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
					rows={trainings.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={trainings.total}
					pageSizeOptions={[1, 3, 10]}
					getRowId={(row) =>
						row.volunteer_id.toString() + row.training_id.toString()
					}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('VolunteerTraining.noRowsLabel'),
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
