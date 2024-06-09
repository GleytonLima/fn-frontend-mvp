import { MissaoTipo } from '../models/missao';
import api from './api.config';

export const listVolunteersByMissionType = async (filtros: {
	missaoTipo: MissaoTipo | null;
	nome: string;
}) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append('limit', '10');
		queryParams.append('offset', '0');
		queryParams.append(
			'expands',
			'volunteer_degree,volunteer_postgraduate_degree'
		);
		const response = await api.get(`/volunteers?${queryParams}`);
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
