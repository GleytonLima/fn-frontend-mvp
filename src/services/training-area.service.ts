import { SortParam } from '../models/pagination';
import api from './api.config';

export const listTrainingAreas = async (
	trainingId: number,
	pagination: {
		limit: number;
		offset: number;
		sortingParams?: SortParam[];
	}
) => {
	try {
		const queryParams = new URLSearchParams();
		queryParams.append('limit', pagination.limit.toString());
		queryParams.append('offset', pagination.limit * pagination.offset + '');
		if (pagination.sortingParams) {
			pagination.sortingParams.forEach((sortItem) => {
				queryParams.append('sort', `${sortItem.field},${sortItem.sort}`);
			});
		}
		const response = await api.get(
			`/trainings/${trainingId}/areas?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createTrainingArea = async (
	trainingId: number,
	trainingAreaId: number
) => {
	try {
		const response = await api.post(`/trainings/${trainingId}/areas`, {
			training_area_id: trainingAreaId
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteTrainingArea = async (
	trainingId: number,
	trainingAreaId: number
) => {
	try {
		const response = await api.delete(
			`/trainings/${trainingId}/areas/${trainingAreaId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
