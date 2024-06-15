import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { BasicTable } from '../../models/basic-table';
import { labelDisplayedRows } from '../../models/pagination-translate';

import {
	addVolunteerHealthStatus,
	listVolunteerHealthStatuses,
	removeVolunteerHealthStatus
} from '../../services/volunteer-health-statuses.service';
import BasicAutocomplete from '../BasicAutocomplete';
import CustomNoRowsOverlay from '../CustomNoRowsOverlay';
import { VolunteerSchema } from '../VolunteerForm';

const healthStatusSchema = z.object({
	id: z.number().optional(),
	volunteer_id: z.number().optional(),
	health_status_id: z.number().optional(),
	updated_at: z.string().optional()
});

export type HealthStatusSchema = z.infer<typeof healthStatusSchema>;

interface VolunteerHealthStatusProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { degree?: string }) => void;
}

export const VolunteerHealthStatus = ({
	volunteer
}: VolunteerHealthStatusProps) => {
	const [loading, setLoading] = useState(false);
	const { setValue, handleSubmit, getValues } = useForm<HealthStatusSchema>({
		resolver: zodResolver(healthStatusSchema),
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
			console.log('Início da requisição de graus de voluntários', params);
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
					console.log('Fim da requisição de graus de voluntários', degrees);
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

	const handleRemoveVolunteerHealthStatus = useCallback(
		(row: {
				id: number;
				volunteer_id: number;
				health_status_id: number;
				updated_at: string;
				health_status: { id: number; name: string };
			}) =>
			() => {
				removeVolunteerHealthStatus(row.id)
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
			width: 150,
			renderCell: (params) => {
				return (
					<Button
						variant="contained"
						color="error"
						onClick={handleRemoveVolunteerHealthStatus(params.row)}
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
			addVolunteerHealthStatus({
				id: data.id,
				volunteer_id: volunteer.id,
				health_status_id: data.health_status_id,
				updated_at: new Date().toISOString()
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
					{t('VolunteerHealthStatus.title')}
				</Typography>
				<Grid container spacing={1} padding={2}>
					<Grid item xs={9}>
						<BasicAutocomplete
							tableName="health_status"
							defaultValue={null}
							config={{
								label: t('Volunteer.health_status'),
								placeholder: ''
							}}
							onChange={(field) => {
								console.log(field);
								const uniqueFiled = field as BasicTable;
								setValue('health_status_id', uniqueFiled?.id);
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
						rows={vaccines.data}
						columns={columns}
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
			</form>
		</>
	);
};
