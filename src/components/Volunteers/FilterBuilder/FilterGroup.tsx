import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterField from './FilterField';
import { FilterFieldType, FilterGroupType } from './filter';

interface FilterGroupProps {
	group: FilterGroupType;
	onChange: (group: FilterGroupType) => void;
	onDelete?: () => void; // Função para deletar o grupo (opcional)
}

const FilterGroup: React.FC<FilterGroupProps> = ({
	group,
	onChange,
	onDelete
}) => {
	const [isAddingFilter, setIsAddingFilter] = useState(false);

	const { t } = useTranslation();

	console.log('isAddingFilter', isAddingFilter);

	const handleAddFilter = () => {
		setIsAddingFilter(true);
		onChange({
			...group,
			filters: [
				...group.filters,
				{ field: '', operator: 'equals', value: null } as FilterFieldType
			]
		});
	};

	const handleAddGroup = () => {
		setIsAddingFilter(true);
		onChange({
			...group,
			filters: [
				...group.filters,
				{
					operator: 'AND',
					filters: [{ field: '', operator: 'equals', value: null }]
				}
			]
		});
	};

	const handleFilterChange = (
		index: number,
		newFilter: FilterFieldType | FilterGroupType
	) => {
		const newFilters = [...group.filters];
		newFilters[index] = newFilter;
		onChange({ ...group, filters: newFilters });
	};

	const handleFilterDelete = (index: number) => {
		const newFilters = group.filters.filter((_, i) => i !== index);
		onChange({ ...group, filters: newFilters });
	};

	const handleGroupDelete = () => {
		if (onDelete) {
			onDelete();
		}
	};

	return (
		<Paper sx={{ p: 2, mb: 2 }} elevation={5} variant="elevation">
			<FormControl style={{ width: 150 }}>
				<InputLabel id="demo-simple-select-label">
					{t('FilterGroup.groupOperator')}
				</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					label={t('FilterGroup.groupOperator')}
					placeholder={t('FilterGroup.groupOperatorHint')}
					value={group.operator}
					onChange={(e) =>
						onChange({ ...group, operator: e.target.value as 'AND' | 'OR' })
					}
				>
					<MenuItem value="AND">E</MenuItem>
					<MenuItem value="OR">OU</MenuItem>
				</Select>
			</FormControl>

			{group.filters.map((filter, index) => (
				<div key={index}>
					{filter?.operator == 'AND' || filter?.operator == 'OR' ? (
						<FilterGroup
							group={filter as FilterGroupType}
							onChange={(newGroup) => handleFilterChange(index, newGroup)}
							onDelete={() => handleFilterDelete(index)}
						/>
					) : (
						<FilterField
							field={filter as FilterFieldType}
							onChange={(newField) => handleFilterChange(index, newField)}
							onDelete={() => handleFilterDelete(index)}
							fields={[
								{ key: 'language', value: t('FilterGroup.language') },
								{ key: 'degree', value: t('FilterGroup.degree') },
								{
									key: 'postgraduate_degree',
									value: t('FilterGroup.postgraduate_degree')
								},
								{
									key: 'medical_specialization',
									value: t('FilterGroup.medical_specialization')
								}
							]}
						/>
					)}
				</div>
			))}
			<Box>
				<Grid container spacing={2}>
					<Grid item>
						<Button
							onClick={handleAddFilter}
							variant="contained"
							color="primary"
						>
							{t('commons.addField')}
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={handleAddGroup}
							variant="contained"
							color="secondary"
						>
							{t('commons.addGroup')}
						</Button>
					</Grid>
					{onDelete && (
						<Grid item>
							<Button
								onClick={handleGroupDelete}
								variant="contained"
								color="warning"
							>
								{t('commons.removeGroup')}
							</Button>
						</Grid>
					)}
				</Grid>
			</Box>
		</Paper>
	);
};

export default FilterGroup;
