import {
	Autocomplete,
	CircularProgress,
	Grid,
	TextField,
	debounce
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BasicTable } from '../../models/basic-table';
import { listBasicTable } from '../../services/basic-tables.service';

interface BasicAutocompleteProps {
	tableName: string;
	field: BasicTable | BasicTable[] | null;
	config: { label: string; placeholder: string; multiple: boolean };
	onChange: (field: BasicTable | BasicTable[] | null) => void;
}

const BasicAutocomplete: React.FC<BasicAutocompleteProps> = React.forwardRef(
	(props, ref) => {
		const { tableName, field, config, onChange } = props;
		const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
		const [inputValue, setInputValue] = useState('');
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(false);
		const [value, setValue] = useState<BasicTable | BasicTable[] | null>([]);
		const { t } = useTranslation();

		const DEBOUNCE_DELAY = 500;
		const DEFAULT_OPTION = {
			id: -1,
			name: t('BasicAutocomplete.typeForMoreResults')
		};

		const fetchOptions = useCallback(
			async (newValue: string) => {
				setLoading(true);
				setError(false);
				try {
					const newOptions = await listBasicTable({
						tableName,
						name: newValue,
						limit: 20,
						offset: 0
					});
					newOptions.push(DEFAULT_OPTION);
					setOptions(newOptions);
				} catch (err) {
					setError(true);
				} finally {
					setLoading(false);
				}
			},
			[tableName]
		);

		const debouncedFetchOptions = useCallback(
			debounce(fetchOptions, DEBOUNCE_DELAY),
			[fetchOptions]
		);

		useEffect(() => {
			debouncedFetchOptions('');
		}, [debouncedFetchOptions]);

		return (
			<Grid>
				<Autocomplete
					ref={ref}
					fullWidth
					id="value-select"
					options={options}
					multiple={!!config.multiple}
					onChange={(event, newValue) => {
						onChange(newValue);
						setValue(newValue);
					}}
					onInputChange={(event, newInputValue) => {
						setInputValue(newInputValue);
						debouncedFetchOptions(newInputValue);
					}}
					inputValue={inputValue}
					getOptionDisabled={(option) => option.id === -1}
					getOptionLabel={(option) => option.name}
					filterSelectedOptions
					value={value}
					loading={loading}
					renderInput={(params) => (
						<TextField
							{...params}
							ref={params.InputProps.ref}
							label={config.label}
							placeholder={config.placeholder}
							error={error}
							helperText={error ? t('BasicAutocomplete.errorMessage') : ''}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
											<CircularProgress color="inherit" size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								)
							}}
						/>
					)}
				/>
			</Grid>
		);
	}
);

export default BasicAutocomplete;
