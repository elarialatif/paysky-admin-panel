import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      this.router.navigate(['/products']);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    this.isAuthenticated = username === 'admin' && password === 'admin';
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }


}
