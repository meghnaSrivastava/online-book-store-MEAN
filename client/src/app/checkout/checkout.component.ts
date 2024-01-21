// Importing necessary modules and components from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // Initializing properties for the checkout component
  totalAmount: number = 0;
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  formControls: any = {};
  bookIds: any = [];

  // Constructor with dependency injection for required services
  constructor(private router: Router, private snackBar: MatSnackBar, private cartService: CartService, private orderService: OrderService) { }

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Fetch and display the cart items on component initialization
    this.getCartItems();
  }

  // Method to confirm and place an order
  confirmOrder() {
    if (localStorage.getItem('id')) {
      // Prepare order details and call placeOrder service
      let orderDetails = { bookIds: this.bookIds, userId: localStorage.getItem('id'), amount: this.totalAmount }
      this.orderService.placeOrder(orderDetails).subscribe(
        response => {
          // Display a toast message to confirm the order
          this.snackBar.open(APP_CONSTANTS['orderPlaced'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          // Navigate to the order history page after successful order placement
          this.router.navigate(['/order-history']);
        },
        error => {
          // Display error message in a snackbar if order placement fails
          this.snackBar.open(APP_CONSTANTS['orderFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      // If user is not logged in, clear local storage and navigate to login page
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  // Method to get and calculate the total amount from the cart items
  getCartItems() {
    let userId = localStorage.getItem('id');
    if (userId) {
      // Fetch cart items for the logged-in user
      this.cartService.getCartItems(userId).subscribe(
        response => {
          let amount = 0;
          if (response.length) {
            // Calculate the total amount and collect bookIds for the order
            for (let i = 0; i < response.length; i++) {
              amount = amount + response[i].book.price;
              this.bookIds.push(response[i].book._id);
            }
          }
          // Update the totalAmount property with the calculated amount

          amount = amount + (amount * 18 / 100) + 30;
          this.totalAmount = (amount.toFixed(2) as unknown) as number;
        },
        error => {
          // Display error message in a snackbar if amount retrieval fails
          this.snackBar.open(APP_CONSTANTS['amountFetchFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      );
    } else {
      // If user is not logged in, clear local storage and navigate to login page
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
