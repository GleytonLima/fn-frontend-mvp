import { VaccineDoseSchema } from '../components/VolunteerVaccineDose';
import api from './api.config';

export const listVolunteerVaccineDoses = async (
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
		const response = await api.get(`/volunteer-vaccine-doses?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerVaccineDose = async (data: VaccineDoseSchema) => {
	try {
		const response = await api.post(`/volunteer-vaccine-doses`, {
			volunteer_id: data.volunteer_id,
			vaccine_id: data.vaccine_id,
			dose_number: data.dose_number,
			date_administered: data.date_administered
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeVolunteerVaccineDose = async (
	volunteerVaccineeDoseId: number
) => {
	try {
		const response = await api.delete(
			`/volunteer-vaccine-doses/${volunteerVaccineeDoseId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
