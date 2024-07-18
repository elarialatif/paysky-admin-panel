import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../store/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiBaseUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiBaseUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiBaseUrl}/users/${user.id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/users/${id}`).pipe(
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
