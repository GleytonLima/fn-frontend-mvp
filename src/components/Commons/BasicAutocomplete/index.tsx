import {
	Autocomplete,
	CircularProgress,
	TextField,
	debounce
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BasicTable } from '../../../models/basic-table';
import { listBasicTable } from '../../../services/basic-tables.service';

interface BasicAutocompleteProps {
	tableName: string;
	value?: BasicTable | null;
	defaultValue?: BasicTable | null;
	config: { label: string; placeholder: string };
	onChange: (field: BasicTable | null) => void;
}

const DEBOUNCE_DELAY = 500;

const BasicAutocomplete: React.FC<BasicAutocompleteProps> = React.forwardRef(
	(props, ref) => {
		const { tableName, defaultValue, config, onChange } = props;
		const [options, setOptions] = useState<{ id: number; name: string }[]>([]);
		const [inputValue, setInputValue] = useState('');
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState(false);
		const { t } = useTranslation();

		const DEFAULT_OPTION = useMemo(
			() => ({
				id: -1,
				name: t('BasicAutocomplete.typeForMoreResults')
			}),
			[t]
		);

		const fetchOptions = useCallback(
			async (newValue: string) => {
				setLoading(true);
				setError(false);
				try {
					const newOptions = await listBasicTable({
						tableName,
						name: newValue,
						limit: 5,
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
			[tableName, DEFAULT_OPTION]
		);

		const debouncedFetchOptions = useCallback(
			debounce(fetchOptions, DEBOUNCE_DELAY),
			[fetchOptions]
		);

		useEffect(() => {
			debouncedFetchOptions('');
		}, [debouncedFetchOptions]);

		return (
			<>
				<Autocomplete
					ref={ref}
					fullWidth
					id="value-select"
					options={options}
					value={props.value}
					defaultValue={defaultValue}
					onChange={(_, newValue) => {
						onChange(newValue);
					}}
					onInputChange={(_, newInputValue) => {
						setInputValue(newInputValue);
						debouncedFetchOptions(newInputValue);
					}}
					inputValue={inputValue}
					getOptionDisabled={(option) => option.id === -1}
					getOptionLabel={(option) => option.name}
					filterSelectedOptions
					loading={loading}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
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
			</>
		);
	}
);

export default BasicAutocomplete;
