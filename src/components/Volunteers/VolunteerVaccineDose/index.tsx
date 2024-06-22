import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ptBR } from '@mui/x-date-pickers/locales';
import useWindowDimensions from '../../../hooks/window-dimensions';
import {
	addVolunteerVaccineDose,
	listVolunteerVaccineDoses,
	removeVolunteerVaccineDose
} from '../../../services/volunteers/volunteer-vaccine-doses.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const vaccineSchema = z.object({
	id: z.number(),
	name: z.string()
});
const vaccineDoseSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	vaccine: vaccineSchema,
	dose_number: z.coerce.number().gt(0),
	date_administered: z.date()
});

export type VaccineDoseSchema = z.infer<typeof vaccineDoseSchema>;

interface VolunteerVaccineDoseProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerVaccineDose = ({
	volunteer
}: VolunteerVaccineDoseProps) => {
	const [loading, setLoading] = useState(false);
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { width } = useWindowDimensions();
	const open = Boolean(anchorEl);
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm<VaccineDoseSchema>({
		resolver: zodResolver(vaccineDoseSchema),
		defaultValues: {
			id: undefined,
			volunteer_id: volunteer?.id,
			vaccine: undefined,
			dose_number: 1,
			date_administered: undefined
		}
	});
	const [vaccines, setVaccineDoses] = useState<{
		data: {
			id: number;
			volunteer_id: number;
			vaccine_id: number;
			dose_number: number;
			date_administered: string;
			vaccine: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			id: number;
			volunteer_id: number;
			vaccine_id: number;
			dose_number: number;
			date_administered: string;
			vaccine: { id: number; name: string };
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
			listVolunteerVaccineDoses(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((results) => {
					setVaccineDoses(results);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerVaccineDose = (row: {
		id: number;
		volunteer_id: number;
		vaccine_id: number;
		dose_number: number;
		date_administered: string;
	}) => {
		setAnchorEl(null);
		removeVolunteerVaccineDose(row.id)
			.then(() => {
				handlePageChange({
					page: 0,
					pageSize: 5
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const columns: GridColDef<(typeof vaccines.data)[number]>[] = [
		{
			field: 'vaccine',
			headerName: t('VolunteerVaccineDose.vaccine'),
			flex: 1,
			renderCell: (params) => {
				return params.row.vaccine.name;
			}
		},
		{
			field: 'dose_number',
			headerName: t('VolunteerVaccineDose.dose_number'),
			flex: 1,
			renderCell: (params) => {
				return params.row.dose_number;
			}
		},
		{
			field: 'date_administered',
			headerName: t('VolunteerVaccineDose.date_administered'),
			flex: 1,
			renderCell: (params) => {
				return new Date(params.row.date_administered).toLocaleDateString();
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
			console.log(data);
			addVolunteerVaccineDose({
				id: data.id,
				volunteer_id: volunteer.id,
				vaccine: data.vaccine,
				dose_number: data.dose_number,
				date_administered: data.date_administered.toISOString()
			})
				.then(() => {
					reset();
					handlePageChange({
						page: 0,
						pageSize: 5
					});
				})
				.catch((err) => {
					console.error(err);
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
				{t('VolunteerVaccineDose.title')}
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
						handleRemoveVolunteerVaccineDose(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={5}>
						<Controller
							name="vaccine"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="vaccine"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.vaccine'),
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
						<TextField
							{...register('dose_number')}
							size="small"
							type="number"
							label={t('VolunteerVaccineDose.dose_number')}
							error={!!errors.dose_number}
							helperText={errors.dose_number?.message}
						/>
					</Grid>
					<Grid item xs={4}>
						<Controller
							name="date_administered"
							control={control}
							render={({ field }) => (
								<DatePicker
									label={t('VolunteerVaccineDose.date_administered')}
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
					<Grid item xs={2}>
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
					columnVisibilityModel={{
						vaccine: true,
						dose_number: width > 600,
						date_administered: width > 600,
						action: true
					}}
					loading={loading}
					paginationMode="server"
					rowCount={vaccines.total}
					pageSizeOptions={[1, 3, 10]}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('VolunteerVaccineDose.noRowsLabel'),
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
