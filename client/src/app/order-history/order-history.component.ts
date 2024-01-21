// Importing necessary modules and components from Angular
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  // Initializing properties for the order history component
  orders: any[] = [];

  // Constructor with dependency injection for required services
  constructor(private orderService: OrderService, private router: Router, private snackBar: MatSnackBar) { }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Get the userId from local storage
    const userId = localStorage.getItem('id');

    if (userId) {
      // Fetch the order history for the logged-in user
      this.orderService.getOrderHistory(userId).subscribe(
        (response) => {
          // Update the orders array with the fetched order history
          this.orders = response;
        },
        (error) => {
          // Display error message in a snackbar if order history fetch fails
          this.snackBar.open(APP_CONSTANTS['orderHistoryFetchFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.error('Error fetching order history:', error);
        }
      );
    } else {
      // If user is not logged in, clear local storage and navigate to login page
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
