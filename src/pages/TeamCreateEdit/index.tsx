import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DialogConfirmation } from '../../components/Commons/DialogConfirmation';
import MainBar from '../../components/Commons/Header';
import { TypographySkeleton } from '../../components/Commons/TypographySkeleton';
import { TeamForm, TeamSchema } from '../../components/Teams/TeamForm';
import {
	createTeam,
	deleteTeam,
	getTeamById,
	updateTeam
} from '../../services/team.service';

export const TeamCreateEditPage = () => {
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
	const [team, setTeam] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const { t } = useTranslation();
	const navigate = useNavigate();
	useEffect(() => {
		if (id) {
			getTeamById(id).then((team) => {
				setTeam(team);
				setLoading(false);
			});
		} else {
			setTeam(undefined);
			setLoading(false);
		}
	}, [id]);

	const handleFormSubmit = (team: TeamSchema) => {
		if (id) {
			updateTeam(team)
				.then(() => {
					enqueueSnackbar(t('TeamCreateEditPage.editSuccess'), {
						variant: 'success'
					});
					navigate('/teams');
				})
				.catch((error) => {
					enqueueSnackbar(`${t('TeamCreateEditPage.editError')}: ${error}`, {
						variant: 'error'
					});
				});
			return;
		}
		createTeam(team)
			.then((response) => {
				enqueueSnackbar(t('TeamCreateEditPage.createSuccess'), {
					variant: 'success'
				});
				navigate(`/teams/${response.id}/edit`);
			})
			.catch((error) => {
				enqueueSnackbar(`${t('TeamCreateEditPage.createError')}: ${error}`, {
					variant: 'error'
				});
			});
	};

	const handleDelete = () => {
		if (id) {
			deleteTeam(id)
				.then(() => {
					enqueueSnackbar(t('TeamCreateEditPage.deleteSuccess'), {
						variant: 'success'
					});
					navigate('/teams');
				})
				.catch((error) => {
					enqueueSnackbar(`${t('TeamCreateEditPage.deleteError')}: ${error}`, {
						variant: 'error'
					});
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
				{loading && !team ? (
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
							{team
								? t('TeamCreateEditPage.editTitle')
								: t('TeamCreateEditPage.createTitle')}
						</Typography>
						<TeamForm
							onSubmit={handleFormSubmit}
							onDelete={() =>
								setOpenDeleteConfirmation({ open: true, value: team })
							}
							team={team}
						/>
					</>
				)}
			</Box>
		</>
	);
};
