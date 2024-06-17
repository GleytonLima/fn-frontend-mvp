import api from '../api.config';

export const listVolunteerDegrees = async (
	volunteerId: number,
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
			`/volunteers/${volunteerId}/degrees?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerDegree = async (
	volunteerId: number,
	degreeId: number
) => {
	try {
		const response = await api.post(`/volunteers/${volunteerId}/degrees`, {
			degree_id: degreeId
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeVolunteerDegree = async (
	volunteerId: number,
	degreeId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/degrees/${degreeId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
