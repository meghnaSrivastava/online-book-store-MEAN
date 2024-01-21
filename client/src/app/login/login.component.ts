// Importing necessary modules and components from Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Initializing properties for the login component
  email: string = '';
  password: string = '';

  // Constructor with dependency injection for required services
  constructor(private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) { }

  // Method to perform user login
  login() {
    // Prepare credentials object with email and password
    const credentials = {
      email: this.email,
      password: this.password,
    };

    // Call the loginUser service to perform the login
    this.loginService.loginUser(credentials).subscribe(
      (response) => {
        // Store user details and JWT token in local storage
        localStorage.setItem('jwt', response.jwt);
        localStorage.setItem('id', response.user._id);
        localStorage.setItem('firstName', response.user.firstName);
        localStorage.setItem('lastName', response.user.lastName);
        localStorage.setItem('role', response.user.role);

        // Display a toast message to confirm the login
        this.snackBar.open(APP_CONSTANTS['loggedIn'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });

        // Navigate to the home page after successful login
        this.router.navigate(['/']);
      },
      (error) => {
        // Log error and display error message in a snackbar if login fails
        console.error('Login failed:', error);
        this.snackBar.open(error.error.message || APP_CONSTANTS['loginFailed'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Method to navigate to the registration page
  register() {
    this.router.navigate(['/register']);
  }
}
