import { VolunteerProfileSchema } from '../components/Volunteers/VolunteerProfileForm';
import { SortParam } from '../models/pagination';
import api from './api.config';

export const listVolunteerProfiles = async (pagination: {
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
		const response = await api.get(`/volunteer-profiles?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const getVolunteerProfileById = async (id: string) => {
	try {
		const response = await api.get(`/volunteer-profiles/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const createVolunteerProfile = async (
	volunteerProfile: VolunteerProfileSchema
) => {
	const volunteerProfileData = sanitizeVolunteerProfileData(volunteerProfile);
	try {
		const response = await api.post(
			'/volunteer-profiles',
			volunteerProfileData
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const updateVolunteerProfile = async (
	volunteerProfile: VolunteerProfileSchema
) => {
	const volunteerProfileData = {
		...volunteerProfile
	};
	try {
		const response = await api.patch(
			`/volunteer-profiles/${volunteerProfile.id}`,
			volunteerProfileData
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const deleteVolunteerProfile = async (id: string) => {
	try {
		const response = await api.delete(`/volunteer-profiles/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const sanitizeVolunteerProfileData = (
	volunteerProfile: VolunteerProfileSchema
) => {
	return {
		...volunteerProfile
	};
};
