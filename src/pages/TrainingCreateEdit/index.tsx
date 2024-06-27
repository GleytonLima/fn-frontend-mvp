import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DialogConfirmation } from '../../components/Commons/DialogConfirmation';
import MainBar from '../../components/Commons/Header';
import { TypographySkeleton } from '../../components/Commons/TypographySkeleton';
import {
	TrainingForm,
	TrainingSchema
} from '../../components/Trainings/TrainingForm';
import {
	createTraining,
	deleteTraining,
	getTrainingById,
	updateTraining
} from '../../services/training.service';

export const TrainingCreateEditPage = () => {
	const { id } = useParams();
	const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({
		open: false,
		value: undefined
	} as {
		open: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value?: any;
	});
	const { enqueueSnackbar } = useSnackbar();
	const [training, setTraining] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const navigate = useNavigate();
	useEffect(() => {
		if (id) {
			getTrainingById(id).then((training) => {
				setTraining(training);
				setLoading(false);
			});
		} else {
			setTraining(undefined);
			setLoading(false);
		}
	}, [id]);

	const handleFormSubmit = (training: TrainingSchema) => {
		if (id) {
			updateTraining(training)
				.then(() => {
					enqueueSnackbar(t('TrainingCreateEditPage.editSuccess'), {
						variant: 'success'
					});
					navigate('/trainings');
				})
				.catch((error) => {
					enqueueSnackbar(
						`${t('TrainingCreateEditPage.editError')}: ${error}`,
						{
							variant: 'error'
						}
					);
				});
			return;
		}
		createTraining(training)
			.then((response) => {
				enqueueSnackbar(t('TrainingCreateEditPage.createSuccess'), {
					variant: 'success'
				});
				navigate(`/trainings/${response.id}/edit`);
			})
			.catch((error) => {
				enqueueSnackbar(
					`${t('TrainingCreateEditPage.createError')}: ${error}`,
					{
						variant: 'error'
					}
				);
			});
	};

	const handleDelete = () => {
		if (id) {
			deleteTraining(id)
				.then(() => {
					enqueueSnackbar(t('TrainingCreateEditPage.deleteSuccess'), {
						variant: 'success'
					});
					navigate('/trainings');
				})
				.catch((error) => {
					enqueueSnackbar(
						`${t('TrainingCreateEditPage.deleteError')}: ${error}`,
						{
							variant: 'error'
						}
					);
				});
		}
	};

	return (
		<>
			<MainBar />
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
						handleDelete();
					}
				}}
			/>
			<Box sx={{ p: 4 }}>
				{loading && !training ? (
					<>
						<TypographySkeleton type="h2" />
						<TypographySkeleton type="h2" />
						<TypographySkeleton type="h2" />
						<TypographySkeleton type="h6" />
						<TypographySkeleton type="h2" />
					</>
				) : (
					<>
						<Typography variant="h4" component="h2" gutterBottom>
							{training
								? t('TrainingCreateEditPage.editTitle')
								: t('TrainingCreateEditPage.createTitle')}
						</Typography>
						<TrainingForm
							onSubmit={handleFormSubmit}
							onDelete={() =>
								setOpenDeleteConfirmation({ open: true, value: training })
							}
							training={training}
						/>
					</>
				)}
			</Box>
		</>
	);
};
