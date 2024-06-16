import { HealthStatusSchema } from '../components/VolunteerHealthStatus';
import api from './api.config';

export const listVolunteerHealthStatuses = async (
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
		queryParams.append('volunteer_id', volunteerId.toString());
		const response = await api.get(`/volunteer-health-statuses?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerHealthStatus = async (data: HealthStatusSchema) => {
	try {
		const response = await api.post(`/volunteer-health-statuses`, {
			volunteer_id: data.volunteer_id,
			health_status_id: data.health_status_id,
			updated_at: data.updated_at
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeVolunteerHealthStatus = async (
	volunteerHealthStatusId: number
) => {
	try {
		const response = await api.delete(
			`/volunteer-health-statuses/${volunteerHealthStatusId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
