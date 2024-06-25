import { Box, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { green } from '@mui/material/colors';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { BasicTable } from '../../../models/basic-table';
import {
	createBasicTable,
	updateBasicTable
} from '../../../services/basic-tables.service';

export default function BasicFormDialog({
	onCreated,
	onClose,
	currentState
}: {
	onCreated: () => void;
	onClose: () => void;
	currentState: {
		open: boolean;
		value: BasicTable;
	};
}) {
	const { enqueueSnackbar } = useSnackbar();
	const [loading, setLoading] = React.useState(false);
	const [searchParams] = useSearchParams();
	const { t } = useTranslation();

	const tableName = searchParams.get('tableName') || '';

	const handleCreateClick = (data: BasicTable) => {
		setLoading(true);
		if (data.id) {
			updateBasicTable({
				tableName: tableName,
				data
			})
				.then(() => {
					setLoading(false);
					enqueueSnackbar(t('BasicFormDialog.editSuccess'), {
						variant: 'success'
					});
					onCreated();
				})
				.catch((error) => {
					setLoading(false);
					enqueueSnackbar(`${t('BasicFormDialog.editError')}: ${error}`, {
						variant: 'error'
					});
				});
			return;
		}
		createBasicTable({
			tableName: tableName,
			data
		})
			.then(() => {
				enqueueSnackbar(t('BasicFormDialog.createSuccess'), {
					variant: 'success'
				});
				setLoading(false);
				onCreated();
			})
			.catch((error) => {
				setLoading(false);
				enqueueSnackbar(`${t('BasicFormDialog.createError')}: ${error}`, {
					variant: 'error'
				});
			});
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '150px'
				}}
			>
				<Dialog
					open={currentState.open}
					fullWidth
					onClose={onClose}
					PaperProps={{
						component: 'form',
						onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
							event.preventDefault();
							const formData = new FormData(event.currentTarget);
							const formJson = Object.fromEntries(formData.entries());
							handleCreateClick({
								...currentState.value,
								name: `${formJson.name}`
							});
						}
					}}
				>
					<DialogTitle>
						{currentState.value.id
							? t('BasicFormDialog.editTitle')
							: t('BasicFormDialog.createTitle')}
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="name"
							label={t('BasicTable.name')}
							defaultValue={currentState.value.name}
							fullWidth
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose} variant="contained" color="secondary">
							{t('commons.cancel')}
						</Button>
						<Button type="submit" variant="contained" color="primary">
							{currentState.value.id ? t('commons.save') : t('commons.create')}
						</Button>
						{loading && (
							<CircularProgress
								size={24}
								sx={{
									color: green[500],
									position: 'absolute',
									top: '50%',
									left: '50%',
									marginTop: '-12px',
									marginLeft: '-12px'
								}}
							/>
						)}
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}
