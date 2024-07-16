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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { // Add router as a private property
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.errorMessage = '';
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (!this.authService.login(username, password)) {
      this.errorMessage = 'Invalid username or password';
    } else {
      this.router.navigate(['/products']);
    }
  }
}
