import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  // Method to remove an item from the cart
  removeFromCart(cartId: string): Observable<any> {
    const headers = this.sharedService.getHeaders();

    const url = `${APP_CONSTANTS.baseUrl}/cart/${cartId}`;
    return this.http.delete(url, { headers });
  }

  // Method to get cart items for a specific user
  getCartItems(userId: string): Observable<any> {
    const headers = this.sharedService.getHeaders();

    const url = `${APP_CONSTANTS.baseUrl}/cart/${userId}`;
    return this.http.get(url, { headers });
  }

  // Method to add books in cart for a specific user
  addToCart(cartDetails: any): Observable<any> {
    const headers = this.sharedService.getHeaders();

    return this.http.post<any>(`${APP_CONSTANTS.baseUrl}/cart`, cartDetails, { headers });
  }
}