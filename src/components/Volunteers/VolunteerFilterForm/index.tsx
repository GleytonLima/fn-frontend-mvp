import { Box, Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BasicTable } from '../../../models/basic-table';
import { QueryParam } from '../../../models/pagination';
import BasicAutocompleteMultiple from '../../Commons/BasicAutocompleteMultiple';

type VoluntariosFilterFormProps = {
	onSubmit: (payload: {
		volunteerProfiles?: QueryParam[];
		nome?: string;
	}) => void;
};

export const VoluntariosFilterForm = ({
	onSubmit
}: VoluntariosFilterFormProps) => {
	const { control, handleSubmit, getValues, reset, watch } = useForm({
		mode: 'onBlur',
		defaultValues: {
			volunteerProfiles: null as BasicTable[] | null,
			nome: ''
		}
	});
	const { t } = useTranslation();
	const volunteerProfiles = watch('volunteerProfiles');
	const nome = watch('nome');

	function submit() {
		const values = getValues();
		onSubmit({
			volunteerProfiles: values.volunteerProfiles?.map((item: BasicTable) => ({
				field: 'volunteer_profile_id',
				value: `${item.id}`
			})),
			nome: values.nome
		});
	}

	function limparFiltros() {
		onSubmit({});
	}

	return (
		<form>
			<Grid container style={{ marginTop: '10px', marginBottom: '20px' }}>
				<Grid item xs={12} sm={12}>
					<Controller
						name="nome"
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								inputProps={{
									autoComplete: 'new-password'
								}}
								fullWidth
								autoComplete="new-password"
								error={!!fieldState?.error?.message}
								helperText={fieldState?.error?.message}
								label="Nome Completo"
							></TextField>
						)}
					/>
				</Grid>
			</Grid>
			<Grid item xs={8}>
				<Controller
					name="volunteerProfiles"
					control={control}
					render={({ field }) => (
						<BasicAutocompleteMultiple
							tableName="volunteer_profile"
							value={field.value ?? []}
							config={{
								label: t('Volunteer.volunteerProfile'),
								placeholder: ''
							}}
							onChange={(values) => {
								if (!values) {
									field.onChange([]);
									return;
								}
								const deduplication = values.filter(
									(item, index) =>
										values.findIndex((i) => i.id === item.id) === index
								);
								field.onChange(deduplication);
							}}
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12} paddingTop={2}>
				<Box display="flex" justifyContent="center" gap="20px">
					<Button
						onClick={handleSubmit(submit)}
						type="submit"
						disabled={!(volunteerProfiles || nome)}
						variant="contained"
						id="signup_button_create-account"
					>
						Aplicar Filtros
					</Button>
					<Button
						onClick={() => {
							reset();
							limparFiltros();
							console.log('reset');
						}}
						disabled={!(volunteerProfiles || nome)}
						variant="contained"
						id="signup_button_reset"
					>
						Limpar Filtros
					</Button>
				</Box>
			</Grid>
		</form>
	);
};
