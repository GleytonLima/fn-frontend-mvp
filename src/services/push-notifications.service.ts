import api from './api.config';

export const getPublicKey = async () => {
	try {
		const response = await api.get('push-notifications/public-key');
		return response.data.publicKey as string;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const registerPushNotification = async (
	subscription: PushSubscription
) => {
	try {
		const response = await api.post(
			'push-notifications/register',
			subscription
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};

export const sendMessages = async (message: string) => {
	try {
		const response = await api.post('push-notifications/send', { message });
		return response.data;
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
