// Importing necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // Constructor with dependency injection for HttpClient
  constructor(private http: HttpClient) { }

  // Method to register a new user
  registerUser(userDetails: any): Observable<any> {
    // Make an HTTP POST request to register a new user with provided details
    return this.http.post<any>(`${APP_CONSTANTS.baseUrl}/register`, userDetails);
  }
}
