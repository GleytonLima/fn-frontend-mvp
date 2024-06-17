import api from '../api.config';

export const fetchVolunteerProfessionalBoards = async (
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
			`/volunteers/${volunteerId}/professional-boards?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addVolunteerProfessionalBoard = async (
	volunteerId: number,
	professionalBoardId: number,
	code: string
) => {
	try {
		const response = await api.post(
			`/volunteers/${volunteerId}/professional-boards`,
			{
				professional_board_id: professionalBoardId,
				code: code
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeProfessionalBoard = async (
	volunteerId: number,
	professionalBoardId: number
) => {
	try {
		const response = await api.delete(
			`/volunteers/${volunteerId}/professional-boards/${professionalBoardId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
