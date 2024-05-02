import { Box, Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { MissaoTipo } from '../../models/missao';
import MissaoTipoDropdown from '../MissaoTipoDropdown';

type VoluntariosFilterFormProps = {
	onSubmit: (payload: {
		missao?: MissaoTipo | null;
		nome?: string;
	}) => Promise<void>;
};

export const VoluntariosFilterForm = ({
	onSubmit
}: VoluntariosFilterFormProps) => {
	const { control, handleSubmit, getValues, reset, watch } = useForm({
		mode: 'onBlur',
		defaultValues: {
			missaoTipo: null as MissaoTipo | null,
			nome: ''
		}
	});

	const missaoTipo = watch('missaoTipo');
	const nome = watch('nome');

	function submit() {
		onSubmit(getValues());
	}

	function limparFiltros() {
		onSubmit({});
	}

	return (
		<form>
			<Grid
				display={'grid'}
				alignItems={'start'}
				justifyItems={'center'}
				gap={'20px'}
				padding={{ xs: '1rem 1.5rem', md: '2rem 20rem', lg: '2rem 30rem' }}
			>
				<Controller
					name="missaoTipo"
					control={control}
					render={({ field, fieldState }) => (
						<MissaoTipoDropdown
							fieldState={fieldState}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
				<Controller
					name="nome"
					control={control}
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							fullWidth
							error={!!fieldState?.error?.message}
							helperText={fieldState?.error?.message}
							id="signup_input_name"
							label="Nome Completo"
						></TextField>
					)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Box display="flex" justifyContent="center" gap="20px">
					<Button
						onClick={handleSubmit(submit)}
						type="submit"
						disabled={!(missaoTipo || nome)}
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
						disabled={!(missaoTipo || nome)}
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
