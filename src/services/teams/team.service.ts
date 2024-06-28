import { TeamSchema } from '../../components/Teams/TeamForm';
import { SortParam } from '../../models/pagination';
import api from '../api.config';

export const listTeams = async (pagination: {
	limit: number;
	offset: number;
	sortingParams?: SortParam[];
}) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append('limit', pagination.limit.toString());
		queryParams.append('offset', pagination.limit * pagination.offset + '');
		if (pagination.sortingParams) {
			pagination.sortingParams.forEach((sortItem) => {
				queryParams.append('sort', `${sortItem.field},${sortItem.sort}`);
			});
		}
		const response = await api.get(`/teams?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const getTeamById = async (id: string) => {
	try {
		const response = await api.get(`/teams/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createTeam = async (team: TeamSchema) => {
	const teamData = sanitizeTeamData(team);
	try {
		const response = await api.post('/teams', teamData);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const updateTeam = async (team: TeamSchema) => {
	const teamData = {
		...team
	};
	try {
		const response = await api.patch(`/teams/${team.id}`, teamData);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteTeam = async (id: string) => {
	try {
		const response = await api.delete(`/teams/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const sanitizeTeamData = (team: TeamSchema) => {
	return {
		...team
	};
};
