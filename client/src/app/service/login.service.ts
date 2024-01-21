// Importing necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Constructor with dependency injection for HttpClient
  constructor(private http: HttpClient) { }

  // Method to perform user login
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    // Make an HTTP POST request to login with provided credentials
    return this.http.post<any>(`${APP_CONSTANTS.baseUrl}/login`, credentials);
  }
}
