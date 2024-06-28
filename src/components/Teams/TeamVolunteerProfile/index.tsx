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
	addTeamVolunteerProfile,
	listTeamVolunteerProfiles,
	removeTeamVolunteerProfile
} from '../../../services/teams/team-volunteer-profiles.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { TeamSchema } from '../TeamForm';

const volunteerProfileSchema = z.object({
	id: z.number(),
	name: z.string()
});
const teamVolunteerProfileSchema = z.object({
	volunteer_profile: volunteerProfileSchema
});

export type TeamVolunteerProfileSchema = z.infer<
	typeof teamVolunteerProfileSchema
>;

interface TeamVolunteerProfileProps {
	team?: TeamSchema;
	onSubmit: (payload: { volunteerProfile?: string }) => void;
}

export const TeamVolunteerProfile = ({ team }: TeamVolunteerProfileProps) => {
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
	} = useForm<TeamVolunteerProfileSchema>({
		resolver: zodResolver(teamVolunteerProfileSchema),
		defaultValues: {
			volunteer_profile: undefined
		}
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const [volunteerProfiles, setDegrees] = useState<{
		data: {
			team_id: number;
			volunteer_profile_id: number;
			volunteer_profile: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			team_id: number;
			volunteer_profile_id: number;
			volunteer_profile: { id: number; name: string };
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
			listTeamVolunteerProfiles(team?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((volunteerProfiles) => {
					setDegrees(volunteerProfiles);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[team?.id]
	);

	const handleRemoveTeamVolunteerProfile = (row: {
		team_id: number;
		volunteer_profile_id: number;
		volunteer_profile: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeTeamVolunteerProfile(row.team_id, row.volunteer_profile_id)
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

	const columns: GridColDef<(typeof volunteerProfiles.data)[number]>[] = [
		{
			field: 'volunteerProfile',
			headerName: t('VolunteerProfile.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.volunteer_profile.name;
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
			addTeamVolunteerProfile(team.id, data.volunteer_profile.id)
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
				{t('TeamVolunteerProfile.title')}
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
						handleRemoveTeamVolunteerProfile(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="volunteer_profile"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="volunteer_profile"
									value={field.value ?? null}
									config={{
										label: t('VolunteerProfile.name'),
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
					rows={volunteerProfiles.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					loading={loading}
					paginationMode="server"
					rowCount={volunteerProfiles.total}
					pageSizeOptions={[1, 3, 10]}
					getRowId={(row) =>
						row.team_id.toString() + row.volunteer_profile_id.toString()
					}
					disableRowSelectionOnClick
					localeText={{
						noRowsLabel: t('TeamVolunteerProfile.noRowsLabel'),
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
