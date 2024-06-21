import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerLanguage,
	fetchVolunteerLanguages,
	removeLanguage
} from '../../../services/volunteers/volunteer-language.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

interface VolunteerLanguageProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { language?: string }) => void;
}

export const VolunteerLanguage = ({ volunteer }: VolunteerLanguageProps) => {
	const [loading, setLoading] = useState(false);
	const { handleSubmit, setValue } = useForm();
	const [postgraduateDegrees, setLanguages] = useState<{
		data: {
			volunteer_id: number;
			language_id: number;
			language: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			language_id: number;
			language: { id: number; name: string };
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
			fetchVolunteerLanguages(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setLanguages(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerLanguage = useCallback(
		(row: {
				volunteer_id: number;
				language_id: number;
				language: { id: number; name: string };
			}) =>
			() => {
				removeLanguage(row.volunteer_id, row.language_id)
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

	const columns: GridColDef<(typeof postgraduateDegrees.data)[number]>[] = [
		{
			field: 'degree',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.language.name;
			}
		},
		{
			field: 'actions',
			headerName: t('commons.actions'),
			width: 150,
			renderCell: (params) => {
				return (
					<IconButton onClick={handleRemoveVolunteerLanguage(params.row)}>
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
			addVolunteerLanguage(volunteer.id, data.language.id)
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
					{t('VolunteerLanguage.title')}
				</Typography>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="language"
							defaultValue={null}
							config={{
								label: t('Volunteer.language'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								setValue('language', field);
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
						rows={postgraduateDegrees.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={postgraduateDegrees.total}
						pageSizeOptions={[1, 10, 50]}
						getRowId={(row) =>
							row.volunteer_id.toString() + row.language_id.toString()
						}
						disableRowSelectionOnClick
						localeText={{
							noRowsLabel: t('VoluntariosTable.noRowsLabel'),
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
