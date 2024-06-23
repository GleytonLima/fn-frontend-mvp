import { zodResolver } from '@hookform/resolvers/zod';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	Button,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import useWindowDimensions from '../../../hooks/window-dimensions';
import { labelDisplayedRows } from '../../../models/pagination-translate';
import {
	addVolunteerProfessionalBoard,
	fetchVolunteerProfessionalBoards,
	removeProfessionalBoard
} from '../../../services/volunteers/volunteer-professional-boards.service';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import CustomNoRowsOverlay from '../../Commons/CustomNoRowsOverlay';
import { DialogConfirmation } from '../../Commons/DialogConfirmation';
import { VolunteerSchema } from '../VolunteerForm';

const professionalBoardSchema = z.object({
	id: z.number(),
	name: z.string()
});

const volunteerProfessionalBoardSchema = z.object({
	professionalBoard: professionalBoardSchema,
	code: z.string().min(1)
});

export type VolunteerProfessionalBoardSchema = z.infer<
	typeof volunteerProfessionalBoardSchema
>;

interface VolunteerProfessionalBoardProps {
	volunteer?: VolunteerSchema;
	onSubmit: (payload: { language?: string }) => void;
}

export const VolunteerProfessionalBoard = ({
	volunteer
}: VolunteerProfessionalBoardProps) => {
	const [loading, setLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { width } = useWindowDimensions();
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
		register,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<VolunteerProfessionalBoardSchema>({
		resolver: zodResolver(volunteerProfessionalBoardSchema),
		defaultValues: {
			professionalBoard: undefined
		}
	});
	const [professionalBoards, setProfessionalBoards] = useState<{
		data: {
			volunteer_id: number;
			professional_board_id: number;
			code: string;
			professional_board: { id: number; name: string };
		}[];
		limit: number;
		total: number;
		offset: number;
	}>({
		data: [] as {
			volunteer_id: number;
			code: string;
			professional_board_id: number;
			professional_board: { id: number; name: string };
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
			fetchVolunteerProfessionalBoards(volunteer?.id, {
				limit: params.pageSize,
				offset: params.page
			})
				.then((degrees) => {
					setProfessionalBoards(degrees);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
				});
		},
		[volunteer?.id]
	);

	const handleRemoveVolunteerProfessionalBoard = (row: {
		volunteer_id: number;
		professional_board_id: number;
		code: string;
		professional_board: { id: number; name: string };
	}) => {
		setAnchorEl(null);
		removeProfessionalBoard(row.volunteer_id, row.professional_board_id)
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

	const columns: GridColDef<(typeof professionalBoards.data)[number]>[] = [
		{
			field: 'professional_board',
			headerName: t('Volunteer.name'),
			flex: 1,
			renderCell: (params) => {
				return params.row.professional_board.name;
			}
		},
		{
			field: 'code',
			headerName: t('VolunteerProfessionalBoard.code'),
			flex: 1,
			renderCell: (params) => {
				return params.row.code;
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
			addVolunteerProfessionalBoard(
				volunteer.id,
				data.professionalBoard.id,
				data.code
			)
				.then(() => {
					reset();
					handlePageChange({
						page: 0,
						pageSize: 5
					});
					enqueueSnackbar(t('commons.addSuccess'), { variant: 'success' });
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
				{t('VolunteerProfessionalBoard.title')}
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
						handleRemoveVolunteerProfessionalBoard(e);
					}
				}}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={1} paddingTop={2} paddingBlock={2}>
					<Grid item xs={6}>
						<Controller
							name="professionalBoard"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="professional_board"
									value={field.value ?? null}
									config={{
										label: t('Volunteer.professionalBoard'),
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
						<TextField
							{...register('code')}
							size="small"
							type="text"
							label={t('VolunteerProfessionalBoard.code')}
							error={!!errors.code}
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
					rows={professionalBoards.data}
					columns={columns}
					disableColumnMenu
					disableColumnSorting
					disableColumnResize
					columnVisibilityModel={{
						professional_board: true,
						code: width > 600 ? true : false,
						actions: true
					}}
					loading={loading}
					paginationMode="server"
					rowCount={professionalBoards.total}
					pageSizeOptions={[1, 10, 50]}
					getRowId={(row) =>
						row.volunteer_id.toString() + row.professional_board_id.toString()
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
