import DeleteIcon from '@mui/icons-material/Delete';
import {
	Autocomplete,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	debounce
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { listBasicTable } from '../../../services/basic-tables.service';
import { FilterFieldType } from './filter';

interface FilterFieldProps {
	field: FilterFieldType;
	onChange: (field: FilterFieldType) => void;
	onDelete: () => void;
	fields: { key: string; value: string }[];
}

const DEBOUNCE_DELAY = 500;
const DEFAULT_OPTION = { id: -1, name: 'Digite para pesquisar mais...' };

const FilterField: React.FC<FilterFieldProps> = ({
	field,
	onChange,
	onDelete,
	fields
}) => {
	const [selectedField, setSelectedField] = useState(field.field);
	const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
	const [inputValue, setInputValue] = useState('');

	const { t } = useTranslation();

	const fetchOptions = useCallback(
		async (newValue: string) => {
			const newOptions = await listBasicTable({
				tableName: selectedField,
				name: newValue,
				limit: 5,
				offset: 0
			});
			newOptions.push(DEFAULT_OPTION);
			return newOptions;
		},
		[selectedField]
	);

	const debouncedFetchOptions = useCallback(
		debounce(async (newValue: string) => {
			const newOptions = await fetchOptions(newValue);
			setOptions(newOptions);
		}, DEBOUNCE_DELAY),
		[fetchOptions]
	);

	useEffect(() => {
		const initializeOptions = async () => {
			const initialOptions = await fetchOptions('');
			setOptions(initialOptions);
		};
		initializeOptions();
	}, [selectedField, fetchOptions]);

	const handleFieldChange = (event: SelectChangeEvent) => {
		const newField = event.target.value;
		setSelectedField(newField);
		onChange({ ...field, field: newField, value: null });
	};

	const handleOperatorChange = (event: SelectChangeEvent) => {
		onChange({ ...field, operator: event.target.value });
	};

	const handleValueChange = (
		_event: React.SyntheticEvent<Element, Event>,
		value: { id: number; name: string } | null
	) => {
		onChange({ ...field, value });
	};

	const handleInputChange = (
		_event: React.SyntheticEvent<Element, Event>,
		newInputValue: string
	) => {
		setInputValue(newInputValue);
		debouncedFetchOptions(newInputValue);
	};

	return (
		<Grid
			container
			spacing={1}
			alignItems="center"
			paddingTop={2}
			paddingBottom={2}
		>
			<Grid item xs={4} minWidth={200}>
				<FormControl fullWidth>
					<InputLabel id="field-select-label">
						{t('FilterGroup.field')}
					</InputLabel>
					<Select
						labelId="field-select-label"
						id="field-select"
						value={selectedField}
						label={t('FilterGroup.field')}
						onChange={handleFieldChange}
					>
						{fields.map((field) => (
							<MenuItem key={field.key} value={field.key}>
								{field.value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={2} minWidth={100}>
				<FormControl fullWidth>
					<InputLabel id="operator-select-label">Operador</InputLabel>
					<Select
						labelId="operator-select-label"
						disabled={!selectedField}
						id="operator-select"
						value={field.operator}
						label="Operador"
						onChange={handleOperatorChange}
					>
						<MenuItem value="equals">Igual</MenuItem>
						{/* Adicione mais operadores conforme necessário */}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={5} minWidth={200}>
				<Autocomplete
					fullWidth
					disabled={!selectedField}
					id="value-select"
					options={options}
					onChange={handleValueChange}
					onInputChange={handleInputChange}
					inputValue={inputValue}
					renderOption={(optionProps, option) => {
						const { ...otherProps } = optionProps;
						return option.id === -1 ? (
							<em {...otherProps}>{option.name}</em>
						) : (
							<li {...otherProps}>{option.name}</li>
						);
					}}
					getOptionDisabled={(option) => option.id === -1}
					getOptionLabel={(option) => option.name}
					filterSelectedOptions
					value={field.value}
					renderInput={(params) => (
						<TextField
							{...params}
							label={t('FilterGroup.label')}
							placeholder={t('FilterGroup.placeholder')}
						/>
					)}
				/>
			</Grid>
			<Grid item xs={1}>
				<IconButton onClick={onDelete}>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default FilterField;
