console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
  const data = e.data;
  console.log('Push Recieved...');
  self.registration.showNotification("Nova Mensagem", {
    body: e.data.text(),
    icon: 'https://i.ibb.co/L9rtjzr/fnsus-icon.png'
  });
});