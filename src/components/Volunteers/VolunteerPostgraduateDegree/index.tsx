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
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerPostgraduateDegree,
	fetchVolunteerPostgraduateDegrees,
	removePostgraduateDegree
} from '../../../services/volunteers/volunteer-postgraduate-degree.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const postdegreeSchema = z.object({
	id: z.number(),
	name: z.string()
});
const volunteerPostdegreeSchema = z.object({
	postgraduateDegree: postdegreeSchema
});

export type VolunteerPostdegreeSchema = z.infer<
	typeof volunteerPostdegreeSchema
>;

interface VolunteerPostgraduateDegreeProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { postgraduate_degree?: string }) => void;
}

export const VolunteerPostgraduateDegree = ({
	volunteer
}: VolunteerPostgraduateDegreeProps) => {
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
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<VolunteerPostdegreeSchema>({
		resolver: zodResolver(volunteerPostdegreeSchema),
		defaultValues: {
			postgraduateDegree: undefined
		}
	});
	const [postgraduateDegrees, setPostgraduateDegrees] = useState<{
		data: {
			volunteer_id: number;
			postgraduate_degree_id: number;
			postgraduate_degree: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			postgraduate_degree_id: number;
			postgraduate_degree: { id: number; name: string };
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
			fetchVolunteerPostgraduateDegrees(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setPostgraduateDegrees(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerPostgraduateDegree = (row: {
		volunteer_id: number;
		postgraduate_degree_id: number;
		postgraduate_degree: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removePostgraduateDegree(row.volunteer_id, row.postgraduate_degree_id)
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

	const columns: GridColDef<(typeof postgraduateDegrees.data)[number]>[] = [
		{
			field: 'degree',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.postgraduate_degree.name;
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
			addVolunteerPostgraduateDegree(volunteer.id, data.postgraduateDegree.id)
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
				{t('VolunteerPostgraduateDegree.title')}
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
						handleRemoveVolunteerPostgraduateDegree(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="postgraduateDegree"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="postgraduate_degree"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.postgraduateDegree'),
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
					rows={postgraduateDegrees.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={postgraduateDegrees.total}
					pageSizeOptions={[1, 10, 50]}
					getRowId={(row) =>
						row.volunteer_id.toString() + row.postgraduate_degree_id.toString()
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
		</>
	);
};
