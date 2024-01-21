// Importing necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APP_CONSTANTS } from '../shared/constants';
import { SharedService } from './shared.service';
import { tap } from 'rxjs/operators';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
  providedIn: 'root',
})
export class BookService {
  // Constructor with dependency injection for required services
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  // Method to fetch books based on a query
  getBooks(query: string): Observable<any[]> {
    // Get headers from shared service
    const headers = this.sharedService.getHeaders();
    let url = `${APP_CONSTANTS.baseUrl}/books`;

    // Append the keyword parameter if provided
    if (query) {
      url += `?keyword=${query}`;
    }

    // Make an HTTP GET request to fetch books and update search results in the shared service
    return this.http.get<any[]>(url, { headers }).pipe(
      tap((results: any) => {
        this.sharedService.updateSearchResults(results);
      })
    );
  }

  // Method to add a new book
  addNewBook(bookDetails: any): Observable<any> {
    // Get headers from shared service
    const headers = this.sharedService.getHeaders();

    // Make an HTTP POST request to add a new book
    return this.http.post<any>(`${APP_CONSTANTS.baseUrl}/book`, bookDetails, { headers });
  }

  // Method to fetch a book by its ID
  getBookById(bookId: string): Observable<any> {
    // Get headers from shared service
    const headers = this.sharedService.getHeaders();

    // Make an HTTP GET request to fetch a book by its ID
    const url = `${APP_CONSTANTS.baseUrl}/book/${bookId}`;
    return this.http.get(url, { headers });
  }

  // Method to update a book by its ID
  updateBookById(bookDetails: any): Observable<any> {
    // Get headers from shared service
    const headers = this.sharedService.getHeaders();

    // Make an HTTP PUT request to update a book by its ID
    return this.http.put<any>(`${APP_CONSTANTS.baseUrl}/book`, bookDetails, { headers });
  }

  // Method to delete a book by its ID
  deleteBookById(bookId: string): Observable<any> {
    // Get headers from shared service
    const headers = this.sharedService.getHeaders();

    // Make an HTTP DELETE request to delete a book by its ID
    const url = `${APP_CONSTANTS.baseUrl}/book/${bookId}`;
    return this.http.delete(url, { headers });
  }
}
