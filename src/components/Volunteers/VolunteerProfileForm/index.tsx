import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import FilterBuilder from '../FilterBuilder';
import { FilterGroupType } from '../FilterBuilder/filter';

const volunteerProfileFormSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	description: z.string().min(1),
	profile_filter: z.record(z.string(), z.string()).optional()
});

export type VolunteerProfileSchema = z.infer<typeof volunteerProfileFormSchema>;

interface VolunteerProfileFormProps {
	volunteerProfile?: VolunteerProfileSchema;
	onSubmit: (volunteer: VolunteerProfileSchema) => void;
	onDelete: () => void;
}

export const VolunteerProfileForm = ({
	onSubmit,
	volunteerProfile,
	onDelete
}: VolunteerProfileFormProps) => {
	const [filter, setFilter] = useState<FilterGroupType>(
		volunteerProfile?.profile_filter &&
			(volunteerProfile.profile_filter as any).operator
			? (volunteerProfile.profile_filter as any)
			: {
					operator: 'AND',
					filters: [{ field: 'language', operator: 'equals', value: null }]
			  }
	);
	const defaultVolunteerProfile = (
		volunteerProfile: VolunteerProfileSchema
	) => {
		return {
			id: volunteerProfile.id,
			name: volunteerProfile.name,
			description: volunteerProfile.description,
			profile_filter: volunteerProfile.profile_filter
		};
	};
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<VolunteerProfileSchema>({
		resolver: zodResolver(volunteerProfileFormSchema),
		defaultValues: volunteerProfile
			? defaultVolunteerProfile(volunteerProfile)
			: undefined
	});
	const { t } = useTranslation();

	const navigate = useNavigate();

	const handleChange = (newFilter: FilterGroupType) => {
		console.log(newFilter);
		setFilter(newFilter);
	};

	const handleUpdateFilter = () => {
		console.log('update filter');
		if (!volunteerProfile) return;
		onSubmit({
			...volunteerProfile,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			profile_filter: filter as any
		});
	};

	return (
		<>
			<Typography variant="h6" component="h2" gutterBottom>
				{t('VolunteerProfileForm.basicData')}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12}>
						<TextField
							{...register('name')}
							label={t('VolunteerProfile.name')}
							variant="outlined"
							fullWidth
							size="small"
							error={!!errors.name}
							helperText={errors.name && t('VolunteerProfileForm.invalidName')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('description')}
							label={t('VolunteerProfile.description')}
							variant="outlined"
							size="small"
							fullWidth
							error={!!errors.description}
							helperText={
								errors.description &&
								t('VolunteerProfileForm.invalidDescription')
							}
						/>
					</Grid>
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
								onClick={() => navigate('/volunteer-profiles')}
							>
								{volunteerProfile?.id ? t('commons.back') : t('commons.cancel')}
							</Button>
						</Grid>
						{volunteerProfile?.id && (
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
			</form>
			{volunteerProfile?.id && (
				<Grid item xs={12} mt={3}>
					<Typography mb={3} variant="h6">
						{t('VolunteerProfileForm.filter')}
					</Typography>
					<FilterBuilder
						filter={filter}
						onChange={handleChange}
						onSave={handleUpdateFilter}
					/>
				</Grid>
			)}
		</>
	);
};
