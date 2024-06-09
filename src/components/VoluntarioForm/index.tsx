import {
	Autocomplete,
	Box,
	Button,
	Chip,
	Grid,
	Tab,
	Tabs,
	TextField,
	Typography,
	debounce
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BasicTable } from '../../models/basic-table';
import { listBasicTable } from '../../services/basic-tables.service';

export interface Voluntario {
	id: number;
	nomeCompleto: string;
	graduacaoFormacao: BasicTable[];
	especializacao: string;
	areaAtuacao: string;
	registroConselhoClasse: string;
	disponibilidadeViagens: string;
	cpf: string;
	uf: string;
	celularWhatsapp: string;
	email: string;
	dominioIdiomas: string[];
	linkCurriculoLattes: string;
	vacinas: string[];
	exames: string[];
	estadoSaude: string;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

interface CadastroVoluntarioProps {
	onSubmit: (voluntario: Voluntario) => void;
}

export const CadastroVoluntario = ({ onSubmit }: CadastroVoluntarioProps) => {
	const { control, handleSubmit, getValues } = useForm<Voluntario>();
	const { t } = useTranslation();
	const [degreeOptions, setDegreeOptions] = useState<
		{ id: number; name: string }[]
	>([]);
	const [degreeOptionsLoading, setDegreeOptionsLoading] = useState(false);

	const DEBOUNCE_DELAY = 500;
	const DEFAULT_OPTION = {
		id: -1,
		name: t('BasicAutocomplete.typeForMoreResults')
	};
	const fetchOptions = useCallback(
		async (tableName: string, newValue: string) => {
			setDegreeOptionsLoading(true);
			try {
				const newOptions = await listBasicTable({
					tableName,
					name: newValue,
					limit: 5,
					offset: 0
				});
				newOptions.push(DEFAULT_OPTION);
				setDegreeOptions(newOptions);
			} finally {
				setDegreeOptionsLoading(false);
			}
		},
		[]
	);

	const debouncedFetchOptions = useCallback(
		debounce(fetchOptions, DEBOUNCE_DELAY),
		[fetchOptions]
	);
	const navigate = useNavigate();

	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (_: React.ChangeEvent<object>, newValue: number) => {
		setTabValue(newValue);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h4" component="h2" gutterBottom>
					Formulário de Voluntário
				</Typography>
				<Grid container spacing={3} padding={2}>
					<Grid item xs={12}>
						<Controller
							name="nomeCompleto"
							control={control}
							defaultValue=""
							render={({ field: { onChange, onBlur, value, ref } }) => (
								<TextField
									inputRef={ref}
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									label="Nome Completo"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="graduacaoFormacao"
							control={control}
							render={({ field }) => {
								const { onChange, value } = field;
								return (
									<Autocomplete
										fullWidth
										onChange={(_, newValue) => {
											onChange(newValue ? newValue : []);
										}}
										value={value ?? []}
										options={degreeOptions}
										multiple={true}
										onInputChange={(_, newInputValue) => {
											debouncedFetchOptions('degree', newInputValue);
										}}
										getOptionDisabled={(option) => option.id === -1}
										getOptionLabel={(option) => option?.name}
										filterSelectedOptions
										loading={degreeOptionsLoading}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Graduação/Formação"
												placeholder="Selecione uma ou mais opções"
											/>
										)}
										renderTags={(tagValue, getTagProps) => {
											return tagValue.map((option, index) => (
												<Chip
													{...getTagProps({ index })}
													key={option.id}
													label={option.name}
												/>
											));
										}}
									/>
								);
							}}
						/>
					</Grid>
					{/* ... */}

					<Box mt={3}>
						<Grid container spacing={2} padding={2}>
							<Grid item>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => navigate('/voluntarios')}
								>
									Cancelar
								</Button>
							</Grid>
							<Grid item>
								<Button type="submit" variant="contained" color="primary">
									Salvar
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					variant="scrollable"
					scrollButtons="auto"
				>
					<Tab label="Dados Pessoais" {...a11yProps(0)} />
					<Tab label="Graduações" {...a11yProps(1)} />
					<Tab label="Especializações" {...a11yProps(2)} />
					<Tab label="Conselhos de Classe" {...a11yProps(3)} />
					<Tab label="Áreas de Atuação" {...a11yProps(4)} />
					<Tab label="Idiomas" {...a11yProps(5)} />
					<Tab label="Vacinas" {...a11yProps(6)} />
					<Tab label="Exames" {...a11yProps(7)} />
					<Tab label="Estado de Saúde" {...a11yProps(8)} />
				</Tabs>
				<CustomTabPanel value={tabValue} index={0}></CustomTabPanel>
				<CustomTabPanel value={tabValue} index={1}>
					<Grid container spacing={3} padding={2}>
						{/* Formulário de vacinas */}
					</Grid>
				</CustomTabPanel>
				<CustomTabPanel value={tabValue} index={2}>
					<Grid container spacing={3}>
						{/* Formulário de exames */}
					</Grid>
				</CustomTabPanel>
				<CustomTabPanel value={tabValue} index={3}>
					<Grid container spacing={3} padding={2}>
						{/* Formulário de estado de saúde */}
					</Grid>
				</CustomTabPanel>
			</form>
			{/* valores do form para debug: */}
			<pre>{JSON.stringify(getValues(), null, 2)}</pre>
		</>
	);
};
