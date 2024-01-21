// Importing necessary modules and components from Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // Initializing properties for the cart component
  cartItems: any[] = [];

  // Constructor with dependency injection for required services
  constructor(private router: Router, private cartService: CartService, private snackBar: MatSnackBar) { }

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Fetch and display the cart items on component initialization
    this.getCartItems();
  }

  // Method to remove an item from the cart
  removeFromCart(item: any) {
    // Call the method to remove an item from the cart
    this.cartService.removeFromCart(item._id).subscribe(
      () => {
        // Display success message in a snackbar
        this.snackBar.open(APP_CONSTANTS['removeFromCart'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        // Update the cart items after successful removal
        this.getCartItems();
      },
      error => {
        // Display error message in a snackbar if cart removal fails
        this.snackBar.open(APP_CONSTANTS['cartRemovalFailed'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        console.error('Error removing from cart', error);
      }
    );
  }

  // Method to calculate the total price of items in the cart
  calculateTotalPrice() {
    let amount = 0;
    if (this.cartItems.length) {
      for (let i = 0; i < this.cartItems.length; i++) {
        amount = amount + this.cartItems[i].book.price;
      }
    }
    return amount;
  }

  // Method to calculate the final amount with tax and shipping
  calculateFinalAmount() {
    let total = this.calculateTotalPrice();
    total = total + (total * 18 / 100) + 30;
    return total.toFixed(2);
  }

  // Method to navigate to the checkout page
  checkout() {
    this.router.navigate(['/checkout']);
  }

  // Private method to get the cart items from the cart service
  private getCartItems() {
    let userId = localStorage.getItem('id');
    if (userId) {
      // Fetch cart items for the logged-in user
      this.cartService.getCartItems(userId).subscribe(
        response => {
          // Update cart items and calculate total and final amounts
          this.cartItems = response;
          this.calculateTotalPrice();
          this.calculateFinalAmount();
        },
        error => {
          // Display error message in a snackbar if cart item retrieval fails
          this.snackBar.open(APP_CONSTANTS['cartGetFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          console.error('Error getting cart items:', error);
        }
      );
    } else {
      // If user is not logged in, clear local storage and navigate to login page
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
