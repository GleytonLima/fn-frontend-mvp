import { zodResolver } from '@hookform/resolvers/zod';
import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
	debounce
} from '@mui/material';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { CustomLocation } from '../../../models/location';
import { listLocations } from '../../../services/locations.service';
import TextMaskCustom from '../../Commons/TextMaskCustom';
import { VolunteerDegree } from '../VolunteerDegree';
import { VolunteerHealthStatus } from '../VolunteerHealthStatus';
import { VolunteerLanguage } from '../VolunteerLanguage';
import { VolunteerMedicalExam } from '../VolunteerMedicalExam';
import { VolunteerMedicalSpecialization } from '../VolunteerMedicalSpecialization';
import { VolunteerPostgraduateDegree } from '../VolunteerPostgraduateDegree';
import { VolunteerProfessionalBoard } from '../VolunteerProfessionalBoard';
import { VolunteerTraining } from '../VolunteerTraining';
import { VolunteerVaccineDose } from '../VolunteerVaccineDose';

const locationSchema = z.object({
	id: z.number(),
	name: z.string(),
	location: z
		.object({
			id: z.number(),
			name: z.string()
		})
		.optional()
		.nullable()
});

type LocationSchema = z.infer<typeof locationSchema>;

const volunteerSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1),
	email: z.string().email(),
	travel_availability: z.boolean().default(false),
	phone_number: z.string().min(15),
	document: z.string().nullable(),
	resume_link: z.string().nullable(),
	location: locationSchema,
	active: z.boolean().default(true)
});

export type VolunteerSchema = z.infer<typeof volunteerSchema>;

interface VolunteerFormProps {
	volunteer?: VolunteerSchema;
	onSubmit: (volunteer: VolunteerSchema) => void;
}

export const VolunteerForm = ({ onSubmit, volunteer }: VolunteerFormProps) => {
	const defaultVolunteer = (volunteer: VolunteerSchema) => {
		return {
			id: volunteer.id,
			name: volunteer.name,
			email: volunteer.email,
			travel_availability: volunteer.travel_availability,
			phone_number: volunteer.phone_number,
			document: volunteer.document,
			resume_link: volunteer.resume_link,
			location: volunteer.location,
			active: volunteer.active
		};
	};
	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<VolunteerSchema>({
		resolver: zodResolver(volunteerSchema),
		defaultValues: volunteer ? defaultVolunteer(volunteer) : undefined
	});
	const [degreeOptions, setDegreeOptions] = useState<LocationSchema[]>([]);
	const { t } = useTranslation();

	const fetchLocationOptions = useCallback(
		async (newValue: string) => {
			try {
				const DEFAULT_OPTION = {
					id: -1,
					name: t('BasicAutocomplete.typeForMoreResults')
				} as CustomLocation;
				const newOptions = await listLocations({
					type_id: null,
					name: newValue,
					limit: 5,
					offset: 0
				});
				newOptions.data.push(DEFAULT_OPTION);
				setDegreeOptions(newOptions.data);
			} catch (error) {
				console.error(error);
			}
		},
		[t]
	);

	useEffect(() => {
		fetchLocationOptions('');
	}, [fetchLocationOptions]);

	const navigate = useNavigate();

	return (
		<>
			<Typography variant="h6" component="h2" gutterBottom>
				{t('VolunteerForm.basicData')}
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12}>
						<TextField
							{...register('name')}
							label={t('Volunteer.name')}
							variant="outlined"
							fullWidth
							error={!!errors.name}
							helperText={errors.name && t('VolunteerForm.invalidName')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('email')}
							label={t('Volunteer.email')}
							variant="outlined"
							fullWidth
							type="email"
							error={!!errors.email}
							helperText={errors.email && t('VolunteerForm.invalidEmail')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('phone_number')}
							label={t('Volunteer.phone')}
							variant="outlined"
							fullWidth
							error={!!errors.phone_number}
							helperText={
								errors.phone_number && t('VolunteerForm.invalidPhone')
							}
							InputProps={{
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								inputComponent: TextMaskCustom as any
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							{...register('travel_availability')}
							control={
								<Checkbox defaultChecked={volunteer?.travel_availability} />
							}
							label={t('Volunteer.travelAvailability')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('document')}
							label={t('Volunteer.document')}
							variant="outlined"
							fullWidth
							error={!!errors.document}
							helperText={errors.document && t('VolunteerForm.invalidDocument')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							{...register('resume_link')}
							label={t('Volunteer.resumeLink')}
							variant="outlined"
							fullWidth
							error={!!errors.resume_link}
							helperText={
								errors.resume_link && t('VolunteerForm.invalidResumeLink')
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							fullWidth
							defaultValue={volunteer?.location}
							options={degreeOptions}
							getOptionDisabled={(option) => option.id === -1}
							getOptionLabel={(option) =>
								`${option?.name}${
									option?.location?.name ? ` - ${option.location.name}` : ''
								}`
							}
							filterSelectedOptions
							onChange={(_, newValue) => {
								if (newValue) {
									setValue('location', newValue);
								}
							}}
							onInputChange={(_, newInputValue) => {
								debounce(() => fetchLocationOptions(newInputValue), 500)();
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label={t('Volunteer.location')}
									placeholder={t('VolunteerForm.searchLocation')}
									error={!!errors.location}
									helperText={
										errors.location && t('VolunteerForm.invalidLocation')
									}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							{...register('active')}
							control={
								<Checkbox
									defaultChecked={volunteer ? volunteer?.active : true}
								/>
							}
							label={t('Volunteer.active')}
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
									onClick={() => navigate('/voluntarios')}
								>
									{volunteer?.id ? t('commons.back') : t('commons.cancel')}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</form>
			{volunteer?.id && (
				<>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerDegree
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerProfessionalBoard
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerPostgraduateDegree
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerTraining
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerMedicalSpecialization
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerLanguage
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerVaccineDose
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerHealthStatus
							volunteer={volunteer}
							onSubmit={(e) => {
								console.log(e);
							}}
						/>
					</Box>
					<Divider />
					<Box mt={2} mb={2}>
						<VolunteerMedicalExam
							volunteer={volunteer}
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
