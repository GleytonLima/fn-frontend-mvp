import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import BasicAutocomplete from '../../Commons/BasicAutocomplete';
import { TrainingArea } from '../TrainingArea';

const trainingType = z.object({
	id: z.number(),
	name: z.string()
});

export type TrainingTypeSchema = z.infer<typeof trainingType>;

const trainingFormSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	description: z.string().min(1),
	training_type: trainingType,
	details_link: z.string().min(1)
});

export type TrainingSchema = z.infer<typeof trainingFormSchema>;

interface TrainingFormProps {
	training?: TrainingSchema;
	onSubmit: (volunteer: TrainingSchema) => void;
	onDelete: () => void;
}

export const TrainingForm = ({
	onSubmit,
	training,
	onDelete
}: TrainingFormProps) => {
	const defaultTraining = (training: TrainingSchema) => {
		return {
			id: training.id,
			name: training.name,
			description: training.description,
			training_type: training.training_type,
			details_link: training.details_link
		};
	};
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<TrainingSchema>({
		resolver: zodResolver(trainingFormSchema),
		defaultValues: training ? defaultTraining(training) : undefined
	});
	const { t } = useTranslation();

	const navigate = useNavigate();

	return (
		<>
			<Typography variant="h6" component="h2" gutterBottom>
				{t('TrainingForm.basicData')}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12}>
						<TextField
							{...register('name')}
							label={t('Training.name')}
							variant="outlined"
							fullWidth
							size="small"
							error={!!errors.name}
							helperText={errors.name && t('TrainingForm.invalidName')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('description')}
							label={t('Training.description')}
							variant="outlined"
							size="small"
							fullWidth
							error={!!errors.description}
							helperText={
								errors.description && t('TrainingForm.invalidDescription')
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('details_link')}
							label={t('Training.detailsLink')}
							variant="outlined"
							fullWidth
							size="small"
							error={!!errors.details_link}
							helperText={
								errors.details_link && t('TrainingForm.invalidResumeLink')
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="training_type"
							control={control}
							render={({ field }) => (
								<BasicAutocomplete
									tableName="training_type"
									value={field.value ?? null}
									config={{
										label: t('Training.trainingType'),
										placeholder: ''
									}}
									onChange={(newValue) => {
										field.onChange(newValue);
									}}
									error={!!errors.training_type}
								/>
							)}
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
									onClick={() => navigate('/trainings')}
								>
									{training?.id ? t('commons.back') : t('commons.cancel')}
								</Button>
							</Grid>
							{training?.id && (
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
			{training?.id && (
				<>
					<Box mt={2} mb={2}>
						<TrainingArea
							training={training}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
				</>
			)}
		</>
	);
};
