import { VolunteerMedicalExamSchema } from '../../components/Volunteers/VolunteerMedicalExam';
import api from '../api.config';

export const listVolunteerMedicalExams = async (
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
		const response = await api.get(`/volunteer-medical-exams?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerMedicalExam = async (
	data: VolunteerMedicalExamSchema
) => {
	try {
		const response = await api.post(`/volunteer-medical-exams`, {
			volunteer_id: data.volunteer_id,
			medical_exam_id: data.medicalExam.id,
			exam_date: data.exam_date
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeVolunteerMedicalExam = async (medicalExamId: number) => {
	try {
		const response = await api.delete(
			`/volunteer-medical-exams/${medicalExamId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
