import api from '../api.config';

export const listVolunteerTrainings = async (
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
			`/volunteers/${volunteerId}/trainings?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerTraining = async (data: {
	volunteerId: number;
	trainingId: number;
	date_completed: string;
}) => {
	try {
		const response = await api.post(
			`/volunteers/${data.volunteerId}/trainings`,
			{
				training_id: data.trainingId,
				date_completed: data.date_completed
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeVolunteerTraining = async (
	volunteerId: number,
	trainingId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/trainings/${trainingId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
