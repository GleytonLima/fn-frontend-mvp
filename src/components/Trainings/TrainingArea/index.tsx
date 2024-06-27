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
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	createTrainingArea,
	deleteTrainingArea,
	listTrainingAreas
} from '../../../services/training-area.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { TrainingSchema } from '../TrainingForm';

const areaSchema = z.object({
	id: z.number(),
	name: z.string()
});
const trainingAreaSchema = z.object({
	training_area: areaSchema
});

export type TrainingAreaSchema = z.infer<typeof trainingAreaSchema>;

interface TrainingAreaProps {
	training?: TrainingSchema;
	onSubmit: (payload: { area?: string }) => void;
}

export const TrainingArea = ({ training }: TrainingAreaProps) => {
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
	} = useForm<TrainingAreaSchema>({
		resolver: zodResolver(trainingAreaSchema),
		defaultValues: {
			training_area: undefined
		}
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [areas, setAreas] = useState<{
		data: {
			training_id: number;
			training_area_id: number;
			training_area: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			training_id: number;
			training_area_id: number;
			training_area: { id: number; name: string };
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
			if (!training?.id) {
				return;
			}
			setLoading(true);
			listTrainingAreas(training?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((areas) => {
					setAreas(areas);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[training?.id]
	);

	const handleRemoveTrainingArea = (row: {
		training_id: number;
		training_area_id: number;
		training_area: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		deleteTrainingArea(row.training_id, row.training_area_id)
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

	const columns: GridColDef<(typeof areas.data)[number]>[] = [
		{
			field: 'area',
			headerName: t('Training.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.training_area.name;
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
			if (!training?.id) {
				return;
			}
			createTrainingArea(training.id, data.training_area.id)
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
		[handlePageChange, training?.id, reset]
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
				{t('TrainingArea.title')}
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
						handleRemoveTrainingArea(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="training_area"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="training_area"
									value={field.value ?? null}
									config={{
										label: t('Training.area'),
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
					rows={areas.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={areas.total}
					pageSizeOptions={[1, 3, 10]}
					getRowId={(row) =>
						row.training_id.toString() + row.training_area_id.toString()
					}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('TrainingArea.noRowsLabel'),
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
