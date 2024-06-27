import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const teamFormSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	description: z.string().min(1)
});

export type TeamSchema = z.infer<typeof teamFormSchema>;

interface TeamFormProps {
	team?: TeamSchema;
	onSubmit: (volunteer: TeamSchema) => void;
	onDelete: () => void;
}

export const TeamForm = ({ onSubmit, team, onDelete }: TeamFormProps) => {
	const defaultTeam = (team: TeamSchema) => {
		return {
			id: team.id,
			name: team.name,
			description: team.description
		};
	};
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TeamSchema>({
		resolver: zodResolver(teamFormSchema),
		defaultValues: team ? defaultTeam(team) : undefined
	});
	const { t } = useTranslation();

	const navigate = useNavigate();

	return (
		<>
			<Typography variant="h6" component="h2" gutterBottom>
				{t('TeamForm.basicData')}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12}>
						<TextField
							{...register('name')}
							label={t('Team.name')}
							variant="outlined"
							fullWidth
							size="small"
							error={!!errors.name}
							helperText={errors.name && t('TeamForm.invalidName')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('description')}
							label={t('Team.description')}
							variant="outlined"
							size="small"
							fullWidth
							error={!!errors.description}
							helperText={
								errors.description && t('TeamForm.invalidDescription')
							}
						/>
					</Grid>

					<Box mt={3}>
						<Grid container spacing={2} padding={2}>
							<Grid item>
								<Button type="submit" variant="contained" color="primary">
									{t('commons.save')}
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => navigate('/teams')}
								>
									{team?.id ? t('commons.back') : t('commons.cancel')}
								</Button>
							</Grid>
							{team?.id && (
								<Grid item>
									<Button
										variant="contained"
										color="warning"
										onClick={() => onDelete()}
									>
										{t('commons.delete')}
									</Button>
								</Grid>
							)}
						</Grid>
					</Box>
				</Grid>
			</form>
		</>
	);
};
