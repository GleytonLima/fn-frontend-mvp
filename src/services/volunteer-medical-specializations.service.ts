import api from './api.config';

export const fetchVolunteerMedicalSpecializations = async (
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
			`/volunteers/${volunteerId}/medical-specializations?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerMedicalSpecialization = async (
	volunteerId: number,
	medicalSpecializationId: number
) => {
	try {
		const response = await api.post(
			`/volunteers/${volunteerId}/medical-specializations`,
			{
				medical_specialization_id: medicalSpecializationId
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeMedicalSpecialization = async (
	volunteerId: number,
	medicalSpecializationId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/medical-specializations/${medicalSpecializationId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
