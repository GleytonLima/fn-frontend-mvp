import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';
import { TypographySkeleton } from '../../components/Commons/TypographySkeleton';
import {
	VolunteerForm,
	VolunteerSchema
} from '../../components/Volunteers/VolunteerForm';
import {
	createVolunteer,
	getVolunteerById,
	updateVolunteer
} from '../../services/volunteers/volunteer.service';

export const VoluntarioCreateEditPage = () => {
	const { id } = useParams();
	const { enqueueSnackbar } = useSnackbar();
	const [volunteer, setVolunteer] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			getVolunteerById(id).then((volunteer) => {
				setVolunteer(volunteer);
				setLoading(false);
			});
		} else {
			setVolunteer(undefined);
			setLoading(false);
		}
	}, [id]);

	const handleFormSubmit = (voluntario: VolunteerSchema) => {
		console.log('VoluntarioCreateEditPage', voluntario);
		if (id) {
			updateVolunteer(voluntario)
				.then(() => {
					enqueueSnackbar(t('VoluntarioCreateEditPage.editSuccess'), {
						variant: 'success'
					});
					navigate('/voluntarios');
				})
				.catch((error) => {
					enqueueSnackbar(
						`${t('VoluntarioCreateEditPage.editError')}: ${error}`,
						{
							variant: 'error'
						}
					);
				});
			return;
		}
		createVolunteer(voluntario)
			.then(() => {
				enqueueSnackbar(t('VoluntarioCreateEditPage.createSuccess'), {
					variant: 'success'
				});
				navigate('/voluntarios');
			})
			.catch((error) => {
				enqueueSnackbar(
					`${t('VoluntarioCreateEditPage.createError')}: ${error}`,
					{
						variant: 'error'
					}
				);
			});
	};

	return (
		<>
			<MainBar />
			<Box sx={{ p: 4 }}>
				{loading ? (
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
							{volunteer
								? t('VoluntarioCreateEditPage.editTitle')
								: t('VoluntarioCreateEditPage.createTitle')}
						</Typography>
						<VolunteerForm onSubmit={handleFormSubmit} volunteer={volunteer} />
					</>
				)}
			</Box>
		</>
	);
};
