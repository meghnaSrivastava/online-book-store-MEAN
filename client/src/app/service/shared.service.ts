// Importing necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Subject to publish and subscribe to search results changes
  private searchResultsSubject = new Subject<any[]>();

  // Observable for components to subscribe to changes in search results
  searchResults$ = this.searchResultsSubject.asObservable();

  // Method to update the search results and notify subscribers
  updateSearchResults(results: any[]) {
    this.searchResultsSubject.next(results);
  }

  // Method to get HTTP headers, including JWT token if available
  getHeaders(): HttpHeaders {
    // Retrieve the JWT token from local storage
    const authToken = localStorage.getItem('jwt');

    // Set the headers with the token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': authToken || '', // Add the x-auth-token header with the token, if available
    });
  }
}
