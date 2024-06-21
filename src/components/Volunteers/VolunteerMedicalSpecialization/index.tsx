import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerMedicalSpecialization,
	fetchVolunteerMedicalSpecializations,
	removeMedicalSpecialization
} from '../../../services/volunteers/volunteer-medical-specializations.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

interface VolunteerMedicalSpecializationProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { language?: string }) => void;
}

export const VolunteerMedicalSpecialization = ({
	volunteer
}: VolunteerMedicalSpecializationProps) => {
	const [loading, setLoading] = useState(false);
	const { handleSubmit, setValue } = useForm();
	const [professionalBoards, setMedicalSpecializations] = useState<{
		data: {
			volunteer_id: number;
			medical_specialization_id: number;
			medical_specialization: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			code: string;
			medical_specialization_id: number;
			medical_specialization: { id: number; name: string };
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
			fetchVolunteerMedicalSpecializations(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setMedicalSpecializations(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerMedicalSpecialization = useCallback(
		(row: {
				volunteer_id: number;
				medical_specialization_id: number;
				medical_specialization: { id: number; name: string };
			}) =>
			() => {
				removeMedicalSpecialization(
					row.volunteer_id,
					row.medical_specialization_id
				)
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

	const columns: GridColDef<(typeof professionalBoards.data)[number]>[] = [
		{
			field: 'medical_specialization',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.medical_specialization.name;
			}
		},
		{
			field: 'actions',
			headerName: t('commons.actions'),
			width: 150,
			renderCell: (params) => {
				return (
					<IconButton
						onClick={handleRemoveVolunteerMedicalSpecialization(params.row)}
					>
						<DeleteIcon />
					</IconButton>
				);
			}
		}
	];

	const onSubmit = useCallback(
		(data: FieldValues) => {
			if (!volunteer?.id) {
				return;
			}
			addVolunteerMedicalSpecialization(
				volunteer.id,
				data.medical_specialization.id
			)
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h6" component="h2" gutterBottom>
					{t('VolunteerMedicalSpecialization.title')}
				</Typography>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="medical_specialization"
							defaultValue={null}
							config={{
								label: t('Volunteer.medicalSpecialization'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								setValue('medical_specialization', field);
							}}
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
						rows={professionalBoards.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={professionalBoards.total}
						pageSizeOptions={[1, 10, 50]}
						getRowId={(row) =>
							row.volunteer_id.toString() +
							row.medical_specialization_id.toString()
						}
						disableRowSelectionOnClick
						localeText={{
							noRowsLabel: t('VolunteerMedicalSpecialization.noRowsLabel'),
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
