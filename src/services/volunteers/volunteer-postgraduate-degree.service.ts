import api from '../api.config';

export const fetchVolunteerPostgraduateDegrees = async (
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
			`/volunteers/${volunteerId}/postgraduate-degrees?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerPostgraduateDegree = async (
	volunteerId: number,
	postgraduateDegreeId: number
) => {
	try {
		const response = await api.post(
			`/volunteers/${volunteerId}/postgraduate-degrees`,
			{
				postgraduate_degree_id: postgraduateDegreeId
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removePostgraduateDegree = async (
	volunteerId: number,
	postgraduateDegreeId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/postgraduate-degrees/${postgraduateDegreeId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
