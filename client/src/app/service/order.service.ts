// Importing necessary modules and components from Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';
import { SharedService } from './shared.service';

// Injectable decorator to make the service injectable throughout the application
@Injectable({
    providedIn: 'root',
})
export class OrderService {
    // Constructor with dependency injection for HttpClient and SharedService
    constructor(private http: HttpClient, private sharedService: SharedService) { }

    // Method to fetch order history for a specific user
    getOrderHistory(userId: string): Observable<any[]> {
        // Get headers from shared service
        const headers = this.sharedService.getHeaders();

        // Make an HTTP GET request to fetch order history for the specified user
        return this.http.get<any[]>(`${APP_CONSTANTS.baseUrl}/order/${userId}`, { headers });
    }

    // Method to place a new order
    placeOrder(orderDetails: any): Observable<any> {
        // Get headers from shared service
        const headers = this.sharedService.getHeaders();

        // Make an HTTP POST request to place a new order
        return this.http.post<any>(`${APP_CONSTANTS.baseUrl}/order`, orderDetails, { headers });
    }
}