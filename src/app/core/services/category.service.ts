import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../store/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiBaseUrl}/products/categories`).pipe(
      catchError(this.handleError)
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiBaseUrl}/products/categories`, category).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiBaseUrl}/products/categories/${category.id}`, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/products/categories/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // Log error to the console or send it to a logging server
    console.error('An error occurred:', error);

    // Optionally transform error to user-friendly message or re-throw as a new error
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
