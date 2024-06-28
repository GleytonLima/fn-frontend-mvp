import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DialogConfirmation } from '../../components/Commons/DialogConfirmation';
import MainBar from '../../components/Commons/Header';
import { TypographySkeleton } from '../../components/Commons/TypographySkeleton';
import {
	VolunteerProfileForm,
	VolunteerProfileSchema
} from '../../components/Volunteers/VolunteerProfileForm';
import {
	createVolunteerProfile,
	deleteVolunteerProfile,
	getVolunteerProfileById,
	updateVolunteerProfile
} from '../../services/volunteer-profile.service';

export const VolunteerProfileCreateEditPage = () => {
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
	const [volunteerProfile, setVolunteerProfile] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const navigate = useNavigate();
	useEffect(() => {
		if (id) {
			getVolunteerProfileById(id).then((volunteerProfile) => {
				setVolunteerProfile(volunteerProfile);
				setLoading(false);
			});
		} else {
			setVolunteerProfile(undefined);
			setLoading(false);
		}
	}, [id]);

	const handleFormSubmit = (volunteerProfile: VolunteerProfileSchema) => {
		if (id) {
			updateVolunteerProfile(volunteerProfile)
				.then(() => {
					enqueueSnackbar(t('VolunteerProfileCreateEditPage.editSuccess'), {
						variant: 'success'
					});
					navigate('/volunteer-profiles');
				})
				.catch((error) => {
					enqueueSnackbar(
						`${t('VolunteerProfileCreateEditPage.editError')}: ${error}`,
						{
							variant: 'error'
						}
					);
				});
			return;
		}
		createVolunteerProfile(volunteerProfile)
			.then((response) => {
				enqueueSnackbar(t('VolunteerProfileCreateEditPage.createSuccess'), {
					variant: 'success'
				});
				navigate(`/volunteer-profiles/${response.id}/edit`);
			})
			.catch((error) => {
				enqueueSnackbar(
					`${t('VolunteerProfileCreateEditPage.createError')}: ${error}`,
					{
						variant: 'error'
					}
				);
			});
	};

	const handleDelete = () => {
		if (id) {
			deleteVolunteerProfile(id)
				.then(() => {
					enqueueSnackbar(t('VolunteerProfileCreateEditPage.deleteSuccess'), {
						variant: 'success'
					});
					navigate('/volunteer-profiles');
				})
				.catch((error) => {
					enqueueSnackbar(
						`${t('VolunteerProfileCreateEditPage.deleteError')}: ${error}`,
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
				{loading && !volunteerProfile ? (
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
							{volunteerProfile
								? t('VolunteerProfileCreateEditPage.editTitle')
								: t('VolunteerProfileCreateEditPage.createTitle')}
						</Typography>
						<VolunteerProfileForm
							onSubmit={handleFormSubmit}
							onDelete={() =>
								setOpenDeleteConfirmation({
									open: true,
									value: volunteerProfile
								})
							}
							volunteerProfile={volunteerProfile}
						/>
					</>
				)}
			</Box>
		</>
	);
};
