import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../store/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}/products/categories`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiBaseUrl}/products/categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiBaseUrl}/products/categories/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/categories/${id}`);
  }
}
