// Importing necessary modules and components from Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../service/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  // Initializing properties for the registration component
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  // Constructor with dependency injection for required services
  constructor(private router: Router, private registrationService: RegistrationService, private snackBar: MatSnackBar) { }

  // Method to perform user registration
  register() {
    // Prepare userDetails object with registration details
    const userDetails = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    // Call the registerUser service to perform the registration
    this.registrationService.registerUser(userDetails).subscribe(
      (response) => {
        // Display a toast message to confirm the registration
        this.snackBar.open(APP_CONSTANTS['registration'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      },
      (error) => {
        // Log error and display error message in a snackbar if registration fails
        console.error('Registration failed:', error);
        this.snackBar.open(error.error.message || APP_CONSTANTS['registrationFailed'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  // Method to navigate to the login page
  login() {
    this.router.navigate(['/login']);
  }
}
