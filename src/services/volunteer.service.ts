import { VolunteerSchema } from '../components/VolunteerForm';
import api from './api.config';

export const listVolunteersByMissionType = async (pagination: {
	limit: number;
	offset: number;
}) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append('limit', pagination.limit.toString());
		queryParams.append('offset', pagination.limit * pagination.offset + '');
		queryParams.append(
			'expands',
			'volunteer_degree,volunteer_postgraduate_degree,location'
		);
		const response = await api.get(`/volunteers?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const getVolunteerById = async (id: string) => {
	try {
		const response = await api.get(`/volunteers/${id}`);
		return response.data.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createVolunteer = async (volunteer: VolunteerSchema) => {
	const volunteerData = sanitizeVolunteerData(volunteer);
	try {
		const response = await api.post('/volunteers', volunteerData);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const updateVolunteer = async (volunteer: VolunteerSchema) => {
	const volunteerData = {
		...volunteer,
		document: volunteer.document === '' ? null : volunteer.document,
		location_id: volunteer.location.id
	};
	try {
		const response = await api.patch(
			`/volunteers/${volunteer.id}`,
			volunteerData
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const searchVolunteers = async (filtros: object) => {
	try {
		const response = await api.post('/volunteers/searches', filtros);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const sanitizeVolunteerData = (volunteer: VolunteerSchema) => {
	return {
		...volunteer,
		document: volunteer.document === '' ? null : volunteer.document,
		location_id: volunteer.location.id
	};
};
