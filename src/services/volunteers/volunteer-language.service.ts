import api from '../api.config';

export const fetchVolunteerLanguages = async (
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
			`/volunteers/${volunteerId}/languages?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerLanguage = async (
	volunteerId: number,
	languageId: number
) => {
	try {
		const response = await api.post(`/volunteers/${volunteerId}/languages`, {
			language_id: languageId
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeLanguage = async (
	volunteerId: number,
	languageId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/languages/${languageId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
