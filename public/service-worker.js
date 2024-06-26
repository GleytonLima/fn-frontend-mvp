console.log('Service Worker Loaded...');

self.addEventListener('push', e => {
  const data = e.data;
  console.log('Push Recieved...');
  self.registration.showNotification("Teste", {
    body: e.data.text(),
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
  });
});