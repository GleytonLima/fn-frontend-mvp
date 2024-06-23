import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

export default function BasicFormDialog() {
	const [open, setOpen] = React.useState(false);
	const { t } = useTranslation();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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
				<Button variant="contained" onClick={handleClickOpen}>
					{t('commons.add')}
				</Button>
				<Dialog
					open={open}
					fullWidth
					onClose={handleClose}
					PaperProps={{
						component: 'form',
						onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
							event.preventDefault();
							const formData = new FormData(event.currentTarget);
							const formJson = Object.fromEntries(formData.entries());
							const email = formJson.email;
							console.log(email);
							handleClose();
						}
					}}
				>
					<DialogTitle>{t('commons.add')}</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="name"
							label={t('BasicTable.name')}
							fullWidth
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="contained" color="secondary">
							{t('commons.cancel')}
						</Button>
						<Button type="submit" variant="contained" color="primary">
							{t('commons.add')}
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
}
