import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { BasicTable } from '../../models/basic-table';
import { labelDisplayedRows } from '../../models/pagination-translate';

import { ptBR } from '@mui/x-date-pickers/locales';
import {
	addVolunteerMedicalExam,
	listVolunteerMedicalExams,
	removeVolunteerMedicalExam
} from '../../services/volunteer-medical-exams.service';
import BasicAutocomplete from '../BasicAutocomplete';
import CustomNoRowsOverlay from '../CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

const medicalExamSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	medical_exam_id: z.number().optional(),
	exam_date: z.string().optional()
});

export type MedicalExamSchema = z.infer<typeof medicalExamSchema>;

interface VolunteerMedicalExamProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerMedicalExam = ({
	volunteer
}: VolunteerMedicalExamProps) => {
	const [loading, setLoading] = useState(false);
	const { setValue, handleSubmit, getValues } = useForm<MedicalExamSchema>({
		resolver: zodResolver(medicalExamSchema),
		defaultValues: undefined
	});
	const [medicalExams, setMedicalExams] = useState<{
		data: {
			id: number;
			volunteer_id: number;
			medical_exam_id: number;
			exam_date: string;
			medical_exam: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			id: number;
			volunteer_id: number;
			medical_exam_id: number;
			exam_date: string;
			medical_exam: { id: number; name: string };
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
			listVolunteerMedicalExams(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((results) => {
					setMedicalExams(results);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerMedicalExam = useCallback(
		(row: {
				id: number;
				volunteer_id: number;
				medical_exam_id: number;
				exam_date: string;
			}) =>
			() => {
				removeVolunteerMedicalExam(row.id)
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

	const columns: GridColDef<(typeof medicalExams.data)[number]>[] = [
		{
			field: 'medical_exam',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.medical_exam.name;
			}
		},
		{
			field: 'exam_date',
			headerName: t('VolunteerMedicalExam.examDate'),
			flex: 1,
			renderCell: (params) => {
				return new Date(params.row.exam_date).toLocaleDateString();
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
						onClick={handleRemoveVolunteerMedicalExam(params.row)}
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
			addVolunteerMedicalExam({
				id: data.id,
				volunteer_id: volunteer.id,
				medical_exam_id: data.medical_exam_id,
				exam_date: data.exam_date
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
					{t('VolunteerMedicalExam.title')}
				</Typography>
				<Grid container spacing={1} padding={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="medical_exam"
							defaultValue={null}
							config={{
								label: t('Volunteer.medicalExam'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								const uniqueFiled = field as BasicTable;
								setValue('medical_exam_id', uniqueFiled?.id);
							}}
						/>
					</Grid>
					<Grid item xs={9}>
						<DatePicker
							label={t('VolunteerMedicalExam.examDate')}
							onError={(error) => {
								console.error(error);
							}}
							onChange={(newValue) =>
								setValue('exam_date', newValue?.toISOString() ?? '')
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
						rows={medicalExams.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={medicalExams.total}
						pageSizeOptions={[1, 3, 10]}
						disableRowSelectionOnClick
						localeText={{
							noRowsLabel: t('VolunteerMedicalExam.noRowsLabel'),
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
