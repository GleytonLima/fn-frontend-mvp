import './App.css';
import HomePage from './pages/Home';
import {
	getPublicKey,
	registerPushNotification
} from './services/push-notifications.service';

window.Notification.requestPermission();

if (import.meta.env.PROD) {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(async (registration) => {
			let subscription = await registration.pushManager.getSubscription();
			if (!subscription) {
				const publicKey = await getPublicKey();
				subscription = await registration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: publicKey
				});
			}
			console.log('New subscription:', JSON.stringify(subscription));
			await registerPushNotification(subscription);
		});
}

function App() {
	return (
		<>
			<HomePage />
		</>
	);
}

export default App;
