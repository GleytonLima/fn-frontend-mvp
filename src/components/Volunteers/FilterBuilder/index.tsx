import * as React from 'react';
import FilterGroup from './FilterGroup';
import { FilterGroupType } from './filter';

interface FilterBuilderProps {
	filter: FilterGroupType;
	onChange: (filter: FilterGroupType) => void;
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({ filter, onChange }) => {
	return (
		<div>
			<FilterGroup group={filter} onChange={onChange} />
		</div>
	);
};

export default FilterBuilder;
