import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router'; // Import the Router class

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;
  isAuthenticated = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { // Add router as a private property
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorMessage = '';
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(res => {
      this.isAuthenticated = true;
      localStorage.setItem('token', res.token);
      this.router.navigate(['/products']);
    }, (error) => {
      this.errorMessage = 'Invalid username or password';
    });
  }
}
