import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Notification } from "src/app/shared/models/notification.model";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { tap } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private baseUrl = "https://v2.daymondboutique.com/api/v2/admin/notification"; // Appel Api Laravel pour les notifications

  constructor(private http: HttpClient) {}

  private getAuthHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem("token");
    if (isFormData) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        // Pas de Content-Type ici !
      });
    } else {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      });
    }
  }
  // Obtenir toutes les notifications
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Envoyer une notification
  createNotification(data: any): Observable<any> {
    const isFormData = data instanceof FormData;
    console.log("🚀 Envoi des données de notification au backend :", data);

    return this.http
      .post(this.baseUrl, data, {
        headers: this.getAuthHeaders(isFormData),
      })
      .pipe(
        catchError((error) => {
          console.error("❌ Erreur création notification :", error);
          return throwError(() => error);
        })
      );
  }

  // Envoyer une notification
  sendNow(notificationId: number): Observable<any> {
    console.log(
      "📤 Tentative d’envoi immédiat de la notification ID :",
      notificationId
    );

    return this.http
      .post(
        `${this.baseUrl}/${notificationId}/send`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      )
      .pipe(
        tap((res) => {
          console.log("✅ Envoi réussi :", res);
        }),
        catchError((error) => {
          console.error(
            "❌ Erreur lors de l’envoi de la notification :",
            error
          );
          return throwError(() => error);
        })
      );
  }

  // Supprimer une notification
  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${notificationId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Obtenir la liste des vendeurs
  getSellers(): Observable<any[]> {
    return this.http
      .get<any>("https://v2.daymondboutique.com/api/v2/admin/seller", {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data || []) // <- on extrait direct ici
      );
  }
}
