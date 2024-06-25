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
	addVolunteerLanguage,
	fetchVolunteerLanguages,
	removeLanguage
} from '../../../services/volunteers/volunteer-language.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const languageSchema = z.object({
	id: z.number(),
	name: z.string()
});

const volunteerLanguageSchema = z.object({
	language: languageSchema
});

export type VolunteerLanguageSchema = z.infer<typeof volunteerLanguageSchema>;

interface VolunteerLanguageProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { language?: string }) => void;
}

export const VolunteerLanguage = ({ volunteer }: VolunteerLanguageProps) => {
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
	});
	const {
		control,
		reset,
		handleSubmit,
		formState: { isValid }
	} = useForm<VolunteerLanguageSchema>({
		resolver: zodResolver(volunteerLanguageSchema),
		defaultValues: {
			language: undefined
		}
	});
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
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
					enqueueSnackbar(t('commons.error'), { variant: 'error' });
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerLanguage = (row: {
		volunteer_id: number;
		language_id: number;
		language: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeLanguage(row.volunteer_id, row.language_id)
			.then(() => {
				handlePageChange({
					page: 0,
					pageSize: 5
				});
				enqueueSnackbar(t('commons.deleteSuccess'), { variant: 'success' });
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar(t('commons.deleteError'), { variant: 'error' });
			});
	};

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
			addVolunteerLanguage(volunteer.id, data.language.id)
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
				{t('VolunteerLanguage.title')}
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
						handleRemoveVolunteerLanguage(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
					<Grid item xs={8}>
						<Controller
							name="language"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="language"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.language'),
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
		</>
	);
};
