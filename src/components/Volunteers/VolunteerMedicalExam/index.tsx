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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ptBR } from '@mui/x-date-pickers/locales';
import {
	addVolunteerMedicalExam,
	listVolunteerMedicalExams,
	removeVolunteerMedicalExam
} from '../../../services/volunteers/volunteer-medical-exams.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const medicalExamSchema = z.object({
	id: z.number(),
	name: z.string()
});

const volunteerMedicalExamSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	medicalExam: medicalExamSchema,
	exam_date: z.date()
});

export type VolunteerMedicalExamSchema = z.infer<
	typeof volunteerMedicalExamSchema
>;

interface VolunteerMedicalExamProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerMedicalExam = ({
	volunteer
}: VolunteerMedicalExamProps) => {
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
	const open = Boolean(anchorEl);
	const {
		handleSubmit,
		reset,
		control,
		formState: { isValid }
	} = useForm<VolunteerMedicalExamSchema>({
		resolver: zodResolver(volunteerMedicalExamSchema),
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

	const handleRemoveVolunteerMedicalExam = (row: {
		id: number;
		volunteer_id: number;
		medical_exam_id: number;
		exam_date: string;
	}) => {
		setAnchorEl(null);
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
	};

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
			addVolunteerMedicalExam({
				id: data.id,
				volunteer_id: volunteer.id,
				medicalExam: data.medicalExam,
				exam_date: data.exam_date.toISOString()
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
				{t('VolunteerMedicalExam.title')}
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
						handleRemoveVolunteerMedicalExam(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={6}>
						<Controller
							name="medicalExam"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="medical_exam"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.medicalExam'),
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
							name="exam_date"
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
					rows={medicalExams.data}
					columns={columns}
					columnVisibilityModel={{
						medical_exam: true,
						exam_date: true,
						actions: true
					}}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
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
		</>
	);
};
