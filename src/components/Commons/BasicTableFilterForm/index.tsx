import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const basicTableFilterSchema = z.object({
	name: z.string().optional()
});

type BasicTableFilterSchema = z.infer<typeof basicTableFilterSchema>;

export const BasicTableFilterForm = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		handleSubmit,
		register,
		reset,
		formState: { dirtyFields }
	} = useForm({
		resolver: zodResolver(basicTableFilterSchema),
		defaultValues: {
			name: searchParams.get('name') ?? ''
		}
	});
	const { t } = useTranslation();

	const onSubmit = ({ name }: BasicTableFilterSchema) => {
		setSearchParams((state) => {
			if (name) {
				state.set('name', name);
			} else {
				state.delete('name');
			}
			return state;
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Grid container spacing={1} paddingTop={2} paddingBottom={2}>
				<Grid item xs={8}>
					<TextField
						{...register('name')}
						size="small"
						label={t('BasicTableFilterForm.name')}
						fullWidth
						InputProps={{
							endAdornment:
								dirtyFields.name || searchParams.get('name') ? (
									<IconButton
										aria-label="clear"
										onClick={() => {
											setSearchParams((state) => {
												state.delete('name');
												return state;
											});
											reset({ name: '' }); // Reset the form field to empty
										}}
									>
										<CloseIcon />
									</IconButton>
								) : null
						}}
					/>
				</Grid>
				<Grid item xs={4} style={{ display: 'flex' }}>
					<Button variant="contained" color="primary" type="submit">
						{t('commons.search')}
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};
