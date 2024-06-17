import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainBar from '../../components/Commons/Header';
import {
	VolunteerForm,
	VolunteerSchema
} from '../../components/Volunteers/VolunteerForm';
import {
	createVolunteer,
	getVolunteerById,
	updateVolunteer
} from '../../services/volunteers/volunteer.service';

export const VoluntarioCreateEditPage = () => {
	const { id } = useParams();
	const [volunteer, setVolunteer] = useState(undefined);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			getVolunteerById(id).then((volunteer) => {
				setVolunteer(volunteer);
				setLoading(false);
			});
		} else {
			setVolunteer(undefined);
			setLoading(false);
		}
	}, [id]);

	const handleFormSubmit = (voluntario: VolunteerSchema) => {
		console.log('VoluntarioCreateEditPage', voluntario);
		if (id) {
			updateVolunteer(voluntario).then(() => {
				navigate('/voluntarios');
			});
			return;
		}
		createVolunteer(voluntario)
			.then(() => {
				navigate('/voluntarios');
			})
			.catch((error) => {
				alert('Erro ao cadastrar voluntário');
				console.error(error);
			});
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<MainBar />
			<Box sx={{ p: 4 }}>
				<VolunteerForm onSubmit={handleFormSubmit} volunteer={volunteer} />
			</Box>
		</>
	);
};
