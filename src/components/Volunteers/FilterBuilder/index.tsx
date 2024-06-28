import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import FilterGroup from './FilterGroup';
import { FilterGroupType } from './filter';

interface FilterBuilderProps {
	filter: FilterGroupType;
	onChange: (filter: FilterGroupType) => void;
	onSave: () => void;
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({
	filter,
	onChange,
	onSave
}) => {
	const { t } = useTranslation();
	return (
		<>
			<FilterGroup group={filter} onChange={onChange} />
			<Grid item>
				<Button variant="contained" color="primary" onClick={onSave}>
					{t('FilterBuilder.saveFilter')}
				</Button>
			</Grid>
		</>
	);
};

export default FilterBuilder;
