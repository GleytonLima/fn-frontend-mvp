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
	addTeamVolunteer,
	listTeamVolunteers,
	removeTeamVolunteer
} from '../../../services/teams/team-volunteer.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { TeamSchema } from '../TeamForm';

const volunteerSchema = z.object({
	id: z.number(),
	name: z.string()
});

const teamRoleSchema = z.object({
	id: z.number(),
	name: z.string()
});

const teamVolunteerSchema = z.object({
	volunteer: volunteerSchema,
	team_role: teamRoleSchema
});

export type TeamVolunteerSchema = z.infer<typeof teamVolunteerSchema>;

interface TeamVolunteerProps {
	team?: TeamSchema;
	onSubmit: (payload: { volunteer?: string }) => void;
}

export const TeamVolunteer = ({ team }: TeamVolunteerProps) => {
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
	} = useForm<TeamVolunteerSchema>({
		resolver: zodResolver(teamVolunteerSchema),
		defaultValues: {
			volunteer: undefined
		}
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [volunteers, setDegrees] = useState<{
		data: {
			team_id: number;
			volunteer_id: number;
			team_role_id: number;
			volunteer: { id: number; name: string };
			team_role: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			team_id: number;
			volunteer_id: number;
			team_role_id: number;
			volunteer: { id: number; name: string };
			team_role: { id: number; name: string };
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
			if (!team?.id) {
				return;
			}
			setLoading(true);
			listTeamVolunteers(team?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((volunteers) => {
					setDegrees(volunteers);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[team?.id]
	);

	const handleRemoveTeamVolunteer = (row: {
		team_id: number;
		volunteer_id: number;
		volunteer: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeTeamVolunteer(row.team_id, row.volunteer_id)
			.then(() => {
				handlePageChange({
					page: 0,
					pageSize: 5
				});
				enqueueSnackbar(t('commons.deleteSuccess'), { variant: 'success' });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const columns: GridColDef<(typeof volunteers.data)[number]>[] = [
		{
			field: 'volunteer',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.volunteer.name;
			}
		},
		{
			field: 'team_role',
			headerName: t('Volunteer.teamRole'),
			flex: 1,
			renderCell: (params) => {
				return params.row.team_role.name;
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
			if (!team?.id) {
				return;
			}
			addTeamVolunteer(team.id, data.volunteer.id, data.team_role.id)
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
		[handlePageChange, team?.id, reset]
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
				{t('TeamVolunteer.title')}
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
						handleRemoveTeamVolunteer(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="volunteer"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="volunteer"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.name'),
										placeholder: ''
									}}
									onChange={(newValue) => {
										field.onChange(newValue);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={8}>
						<Controller
							name="team_role"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="team_role"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.teamRole'),
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
					rows={volunteers.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={volunteers.total}
					pageSizeOptions={[1, 3, 10]}
					getRowId={(row) =>
						row.team_id.toString() + row.volunteer_id.toString()
					}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('TeamVolunteer.noRowsLabel'),
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
