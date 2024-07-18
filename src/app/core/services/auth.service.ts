import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiBaseUrl}/auth/login`, {username, password}).pipe(
      catchError(this.handleError)
    );

  }
  isLoggedIn(): boolean {
    const userToken = localStorage.getItem('token');
    this.isAuthenticated = true;
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
