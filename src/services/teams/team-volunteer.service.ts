import api from '../api.config';

export const listTeamVolunteers = async (
	teamId: number,
	pagination: {
		limit: number;
		offset: number;
	}
) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append('limit', pagination.limit.toString());
		queryParams.append('offset', pagination.limit * pagination.offset + '');
		const response = await api.get(
			`/teams/${teamId}/volunteers?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addTeamVolunteer = async (
	teamId: number,
	volunteerId: number,
	teamRoleId: number
) => {
	try {
		const response = await api.post(`/teams/${teamId}/volunteers`, {
			volunteer_id: volunteerId,
			team_role_id: teamRoleId
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeTeamVolunteer = async (
	teamId: number,
	volunteerId: number
) => {
	try {
		const response = await api.delete(
			`/teams/${teamId}/volunteers/${volunteerId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
