import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color } from '../models/color.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private baseUrl = 'https://v2.daymondboutique.com/api/v2/admin/color'; // adapte cette URL

  constructor(private http: HttpClient) {}

  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.baseUrl);
  }

  getColor(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.baseUrl}/${id}`);
  }

  createColor(color: Color): Observable<Color> {
    return this.http.post<Color>(this.baseUrl, color);
  }

  updateColor(id: number, color: Color): Observable<Color> {
    return this.http.put<Color>(`${this.baseUrl}/${id}`, color);
  }

  deleteColor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
