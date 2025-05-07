import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Brand {
  id: number;
  name: string;
  picture_path: string | null;
}

@Injectable({ providedIn: 'root' })
export class BrandService {
  private baseUrl = 'https://v2.daymondboutique.com/api/v2/admin/brand';

  constructor(private http: HttpClient) {}

  /** Renvoie directement un tableau de Brand */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.baseUrl);
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseUrl}/${id}`);
  }

  createBrand(data: FormData): Observable<Brand> {
    return this.http.post<Brand>(this.baseUrl, data);
  }

  updateBrand(id: number, data: FormData): Observable<Brand> {
    return this.http.post<Brand>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
