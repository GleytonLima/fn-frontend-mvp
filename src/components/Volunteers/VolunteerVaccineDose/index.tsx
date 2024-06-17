import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { BasicTable } from '../../../models/basic-table';
import { labelDisplayedRows } from '../../../models/pagination-translate';

import { ptBR } from '@mui/x-date-pickers/locales';
import {
	addVolunteerVaccineDose,
	listVolunteerVaccineDoses,
	removeVolunteerVaccineDose
} from '../../../services/volunteers/volunteer-vaccine-doses.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

const vaccineDoseSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	vaccine_id: z.number().optional(),
	dose_number: z.coerce.number(),
	date_administered: z.string().optional()
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
	const {
		setValue,
		register,
		handleSubmit,
		getValues,
		formState: { errors }
	} = useForm<VaccineDoseSchema>({
		resolver: zodResolver(vaccineDoseSchema),
		defaultValues: undefined
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
				.then((degrees) => {
					setVaccineDoses(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerVaccineDose = useCallback(
		(row: {
				id: number;
				volunteer_id: number;
				vaccine_id: number;
				dose_number: number;
				date_administered: string;
			}) =>
			() => {
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
			},
		[handlePageChange]
	);

	const columns: GridColDef<(typeof vaccines.data)[number]>[] = [
		{
			field: 'vaccine',
			headerName: t('Volunteer.name'),
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
			width: 150,
			renderCell: (params) => {
				return (
					<Button
						variant="contained"
						color="error"
						onClick={handleRemoveVolunteerVaccineDose(params.row)}
					>
						{t('commons.remove')}
					</Button>
				);
			}
		}
	];

	const onSubmit = useCallback(
		(data: FieldValues) => {
			if (!volunteer?.id) {
				return;
			}
			addVolunteerVaccineDose({
				id: data.id,
				volunteer_id: volunteer.id,
				vaccine_id: data.vaccine_id,
				dose_number: data.dose_number,
				date_administered: data.date_administered
			})
				.then(() => {
					handlePageChange({
						page: 0,
						pageSize: 5
					});
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[handlePageChange, volunteer?.id]
	);

	useEffect(() => {
		handlePageChange({
			page: 0,
			pageSize: 5
		});
	}, [handlePageChange]);

	return (
		<>
			<pre>{JSON.stringify(getValues, null, 2)}</pre>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h6" component="h2" gutterBottom>
					{t('VolunteerVaccineDose.title')}
				</Typography>
				<Grid container spacing={1} padding={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="vaccine"
							defaultValue={null}
							config={{
								label: t('Volunteer.vaccine'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								const uniqueFiled = field as BasicTable;
								setValue('vaccine_id', uniqueFiled?.id);
							}}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							{...register('dose_number')}
							type="number"
							label={t('VolunteerVaccineDose.dose_number')}
							error={!!errors.dose_number}
							helperText={errors.dose_number?.message}
						/>
					</Grid>
					<Grid item xs={9}>
						<DatePicker
							label={t('VolunteerVaccineDose.date_administered')}
							onError={(error) => {
								console.error(error);
							}}
							onChange={(newValue) =>
								setValue('date_administered', newValue?.toISOString() ?? '')
							}
							format="dd/MM/yyyy"
							localeText={
								ptBR.components.MuiLocalizationProvider.defaultProps.localeText
							}
						/>
					</Grid>
					<Grid item xs={3}>
						<Button type="submit" variant="contained" color="primary">
							{t('commons.add')}
						</Button>
					</Grid>
				</Grid>
				<div style={{ height: 250, width: '100%' }}>
					<DataGrid
						rows={vaccines.data}
						columns={columns}
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
			</form>
		</>
	);
};
