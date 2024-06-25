import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';

export interface DialogConfirmationProps {
	currentState: {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any;
		title?: string;
		message?: string;
	};
	model?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onClose: (value?: any) => void;
}

export const DialogConfirmation = (props: DialogConfirmationProps) => {
	const { onClose, currentState, model, ...other } = props;
	const { t } = useTranslation();

	const modelMessages: Record<
		string,
		{ title: string; message: string; confirm: string }
	> = {
		delete: {
			title: t('commons.deleteTitle'),
			message: t('commons.deleteMessage'),
			confirm: t('commons.remove')
		}
	};

	const handleCancel = () => {
		onClose();
	};

	const handleOk = () => {
		onClose(currentState.value);
	};

	return (
		<Dialog maxWidth="xs" open={currentState.open} {...other}>
			<DialogTitle>
				{model ? modelMessages[model].title : currentState.title}
			</DialogTitle>
			<DialogContent dividers>
				<Typography variant="body1">
					{model ? modelMessages[model].message : currentState.message}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					autoFocus
					onClick={handleCancel}
					variant="contained"
					color="primary"
				>
					{t('commons.cancel')}
				</Button>
				<Button onClick={handleOk} variant="contained" color="error">
					{model ? modelMessages[model].confirm : t('commons.confirm')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};
