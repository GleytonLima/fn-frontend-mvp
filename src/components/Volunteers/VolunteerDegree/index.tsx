import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerDegree,
	listVolunteerDegrees,
	removeVolunteerDegree
} from '../../../services/volunteers/volunteer-degree.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

interface VolunteerDegreeProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerDegree = ({ volunteer }: VolunteerDegreeProps) => {
	const [loading, setLoading] = useState(false);
	const { handleSubmit, setValue } = useForm();
	const [degrees, setDegrees] = useState<{
		data: {
			volunteer_id: number;
			degree_id: number;
			degree: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			degree_id: number;
			degree: { id: number; name: string };
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
			listVolunteerDegrees(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setDegrees(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerDegree = useCallback(
		(row: {
				volunteer_id: number;
				degree_id: number;
				degree: { id: number; name: string };
			}) =>
			() => {
				removeVolunteerDegree(row.volunteer_id, row.degree_id)
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

	const columns: GridColDef<(typeof degrees.data)[number]>[] = [
		{
			field: 'degree',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.degree.name;
			}
		},
		{
			field: 'actions',
			headerName: t('commons.actions'),
			width: 150,
			renderCell: (params) => {
				return (
					<IconButton onClick={handleRemoveVolunteerDegree(params.row)}>
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
			addVolunteerDegree(volunteer.id, data.degree.id)
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
					{t('VolunteerDegree.title')}
				</Typography>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="degree"
							defaultValue={null}
							config={{
								label: t('Volunteer.degree'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								setValue('degree', field);
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
						rows={degrees.data}
						columns={columns}
						loading={loading}
						paginationMode="server"
						rowCount={degrees.total}
						pageSizeOptions={[1, 3, 10]}
						getRowId={(row) =>
							row.volunteer_id.toString() + row.degree_id.toString()
						}
						disableRowSelectionOnClick
						localeText={{
							noRowsLabel: t('VolunteerDegree.noRowsLabel'),
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
