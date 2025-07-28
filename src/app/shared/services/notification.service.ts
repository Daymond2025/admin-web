import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Notification } from "src/app/shared/models/notification.model";
import { map, catchError, tap } from "rxjs/operators";


interface PaginatedNotifications {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private baseUrl = "https://v2.daymondboutique.com/api/v2/admin/notification";

  constructor(private http: HttpClient) {}

  private getAuthHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    });
  }
  

  // 🔄 Récupérer toutes les notifications
  getAllNotifications(): Observable<PaginatedNotifications> {
  return this.http.get<PaginatedNotifications>(this.baseUrl, {
    headers: this.getAuthHeaders(),
  });
}

  // 📩 Créer une notification (immédiate ou programmée)
  createNotification(data: any): Observable<any> {
    const isFormData = data instanceof FormData;
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

  // 🚀 Forcer l’envoi immédiat
  sendNow(notificationId: number): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/${notificationId}/send`, {}, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        tap((res) => console.log("✅ Notification envoyée :", res)),
        catchError((error) => {
          console.error("❌ Erreur lors de l’envoi :", error);
          return throwError(() => error);
        })
      );
  }

  // 🗑️ Supprimer
  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${notificationId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 👀 Détail d’une notification
  getNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✏️ Modifier une notification
  updateNotification(id: number, data: any): Observable<any> {
    const isFormData = data instanceof FormData;
    return this.http.put(`${this.baseUrl}/${id}`, data, {
      headers: this.getAuthHeaders(isFormData),
    });
  }

  // 📇 Liste des vendeurs
  getSellers(): Observable<any[]> {
    return this.http
      .get<any>("https://v2.daymondboutique.com/api/v2/admin/seller", {
        headers: this.getAuthHeaders(),
      })
      .pipe(map((response) => response.data || []));
  }
}
