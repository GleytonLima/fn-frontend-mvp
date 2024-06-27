import { TrainingSchema } from '../components/Trainings/TrainingForm';
import { SortParam } from '../models/pagination';
import api from './api.config';

export const listTrainings = async (pagination: {
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
		const response = await api.get(`/trainings?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const getTrainingById = async (id: string) => {
	try {
		const response = await api.get(`/trainings/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createTraining = async (training: TrainingSchema) => {
	const trainingData = sanitizeTrainingData(training);
	try {
		const response = await api.post('/trainings', trainingData);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const updateTraining = async (training: TrainingSchema) => {
	const trainingData = {
		...training,
		training_type_id: training.training_type.id
	};
	try {
		const response = await api.patch(`/trainings/${training.id}`, trainingData);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteTraining = async (id: string) => {
	try {
		const response = await api.delete(`/trainings/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const sanitizeTrainingData = (training: TrainingSchema) => {
	return {
		...training,
		training_type_id: training.training_type.id
	};
};
