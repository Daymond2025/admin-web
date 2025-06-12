// 📦 Import des bibliothèques Firebase (compat pour FCM + App)
importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.0/firebase-messaging-compat.js');

// ✅ Initialisation de Firebase (les clés sont publiques, pas de souci ici)
firebase.initializeApp({
  apiKey: "AIzaSyDzHyvO-MfKImQnE6cGz2bAZxx40EG5L3s",
  authDomain: "daymondcollaboration.firebaseapp.com",
  projectId: "daymondcollaboration",
  storageBucket: "daymondcollaboration.appspot.com",
  messagingSenderId: "564366639477",
  appId: "1:564366639477:web:3fddfbbf774681a635533c"
});

// 🔔 Initialisation de Firebase Messaging
const messaging = firebase.messaging();

/**
 * 🔕 Gestion des notifications reçues lorsque l'app est en arrière-plan
 */
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 📩 Message reçu en arrière-plan :', payload);

  const notification = payload.notification || {};
  const title = notification.title || '📬 Nouvelle notification';
  const body = notification.body || '';
  const icon = '/assets/img/iconz1.png'; // 🔁 Remplace-le par ton propre chemin d'icône
  const clickAction = payload.data?.click_action || '/';

  const notificationOptions = {
    body,
    icon,
    badge: '/assets/icons/badge-72x72.png', // (Facultatif) Icône badge pour certains devices
    data: {
      click_action: clickAction, // 🔁 URL à ouvrir au clic
    },
  };

  // 💥 Affiche la notification native
  self.registration.showNotification(title, notificationOptions);
});

/**
 * 🖱️ Gestion du clic sur une notification
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] ✅ Notification cliquée.');

  // 🔒 Fermer la notification pour éviter les doublons
  event.notification.close();

  const targetUrl = event.notification.data?.click_action || '/';

  // 🧠 Vérifie s’il existe déjà une fenêtre ouverte sur la même URL
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus(); // 🔁 Ramène la fenêtre au premier plan
        }
      }
      // ➕ Sinon, ouvre une nouvelle fenêtre
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
