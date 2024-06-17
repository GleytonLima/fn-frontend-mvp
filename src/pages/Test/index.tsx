import { Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import FilterBuilder from '../../components/Volunteers/FilterBuilder';
import { FilterGroupType } from '../../components/Volunteers/FilterBuilder/filter';
import { searchVolunteers } from '../../services/volunteers/volunteer.service';

const FilterBuilderTestPage: React.FC = () => {
	const [filter, setFilter] = useState<FilterGroupType>({
		operator: 'AND',
		filters: [{ field: 'language', operator: 'equals', value: null }]
	});
	const [volunteers, setVolunteers] = useState([] as object[]); // Array de voluntários [{}

	const handleChange = (newFilter: FilterGroupType) => {
		console.log(newFilter);
		setFilter(newFilter);
	};
	const handleSearchVolunteers = () => {
		console.log('searching volunteers...');
		searchVolunteers({ query: filter, limit: 10, offset: 0 }).then(
			setVolunteers
		);
	};
	return (
		<Container maxWidth="md">
			<Typography variant="h4">Filtros avançados</Typography>
			<FilterBuilder filter={filter} onChange={handleChange} />
			<Button variant="contained" onClick={handleSearchVolunteers}>
				Buscar Voluntários
			</Button>
			<pre>{JSON.stringify(filter, null, 2)}</pre>
			<pre>{JSON.stringify(volunteers, null, 2)}</pre>
		</Container>
	);
};

export default FilterBuilderTestPage;
