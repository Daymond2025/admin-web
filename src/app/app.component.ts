import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from 'src/environements/environement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';
  currentRoute: string;

  constructor(private router: Router, private http: HttpClient) {
    this.currentRoute = this.router.url;
  }

  ngOnInit() {
    // 🔐 Demande de permission dès le chargement
    this.requestNotificationPermission();

    // 🧭 Mise à jour de la route actuelle
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  /**
   * 🔐 Demande la permission de recevoir les notifications
   */
  async requestNotificationPermission() {
    if (!('serviceWorker' in navigator)) {
      console.warn('❌ Service Worker non supporté sur ce navigateur.');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.warn(`🚫 Permission non accordée : ${permission}`);
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('✅ Service Worker enregistré.');

      const messaging = getMessaging();

      const currentToken = await getToken(messaging, {
        vapidKey: environment.firebase.vpaikey,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        console.log('✅ Token FCM récupéré :', currentToken);
        this.sendTokenToServer(currentToken);
      } else {
        console.warn('⚠️ Aucun token FCM généré.');
      }
    } catch (error) {
      console.error('❌ Erreur lors de l’enregistrement du Service Worker ou de la récupération du token :', error);
    }
  }

  /**
   * 🚀 Envoie le token FCM au backend
   * @param token string
   */
  sendTokenToServer(token: string) {
    const userData = localStorage.getItem('user_info');

    if (!userData) {
      console.warn('⚠️ Aucune donnée utilisateur trouvée dans le localStorage.');
      return;
    }

    let userId: string;

    try {
      const parsed = JSON.parse(userData);
      const possibleId = parsed?.user?.id;

      if (!possibleId || !String(possibleId).match(/^\d+$/)) {
        console.warn('🚫 ID utilisateur invalide.');
        return;
      }

      userId = String(possibleId);
      console.log('✅ ID utilisateur extrait :', userId);
    } catch (e) {
      console.error('❌ Erreur lors de l’analyse de user_info JSON :', e);
      return;
    }

    const payload = {
      user_id: userId,
      token,
      device_type: 'web',
    };

    this.http.post('https://v2.daymondboutique.com/api/v2/fcm-token', payload).subscribe({
      next: (response: any) => {
        console.log('✅ Token FCM envoyé avec succès !', response);

        // 🛡️ Pour éviter un double envoi à chaque rechargement
        if (!sessionStorage.getItem('welcomeSent')) {
          sessionStorage.setItem('welcomeSent', 'true');
          this.sendWelcomeNotification(userId);
        }
      },
      error: (error) => {
        console.error('❌ Échec lors de l’envoi du token au backend :', error);
        if (error.status === 422) {
          console.warn('🧩 Erreurs de validation Laravel :', error.error?.errors);
        }
      }
    });
  }

  /**
   * 💬 Envoie une notification de bienvenue via l'API Laravel
   * @param userId string
   */
  sendWelcomeNotification(userId: string) {
    if (!userId) {
      console.warn('⚠️ Aucun ID utilisateur fourni pour la notification.');
      return;
    }

    const payload = {
      user_id: userId,
      title: '👋 Bienvenue !',
      body: 'Bienvenue sur le tableau de bord administrateur.',
      device_type: 'web',
    };

    console.log('📤 Envoi de la notification :', payload);

    this.http.post('https://v2.daymondboutique.com/api/v2/send-notification', payload)
      .subscribe({
        next: (res) => {
          console.log('✅ Notification de bienvenue envoyée avec succès !', res);
        },
        error: (err) => {
          console.error('❌ Échec de l’envoi de la notification :', err);
        }
      });
  }
}
