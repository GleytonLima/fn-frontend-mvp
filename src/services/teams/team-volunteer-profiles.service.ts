import api from '../api.config';

export const listTeamVolunteerProfiles = async (
	teamId: number,
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
			`/teams/${teamId}/volunteer-profiles?${queryParams}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const addTeamVolunteerProfile = async (
	teamId: number,
	volunteerProfileId: number
) => {
	try {
		const response = await api.post(`/teams/${teamId}/volunteer-profiles`, {
			volunteer_profile_id: volunteerProfileId
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const removeTeamVolunteerProfile = async (
	teamId: number,
	volunteerProfileId: number
) => {
	try {
		const response = await api.delete(
			`/teams/${teamId}/volunteer-profiles/${volunteerProfileId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
