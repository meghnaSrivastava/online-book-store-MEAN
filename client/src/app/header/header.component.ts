// Importing necessary modules and components from Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../service/book.service';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Initializing properties for the header component
  searchTerm: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  // Constructor with dependency injection for required services
  constructor(private router: Router, private snackBar: MatSnackBar, private bookService: BookService) { }

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Check if user is logged in and if the user is an admin
    localStorage.getItem('id') ? this.isLoggedIn = true : this.isLoggedIn = false;
    localStorage.getItem('role') ? (localStorage.getItem('role') == 'admin' ? this.isAdmin = true : this.isAdmin = false) : '';
  }

  // Method to navigate to the cart page
  goToCart() {
    this.router.navigate(['/cart']);
  }

  // Method to search for a book
  searchBook() {
    this.bookService.getBooks(this.searchTerm).subscribe(
      () => { },
      (error) => {
        // Display error message in a snackbar if search fails
        this.snackBar.open(APP_CONSTANTS['searchFailed'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  // Method to check if user is logged in and navigate to the login page if not
  loginCheck() {
    localStorage.getItem('id') ? this.isLoggedIn = true : this.isLoggedIn = false;
    localStorage.getItem('role') ? (localStorage.getItem('role') == 'admin' ? this.isAdmin = true : this.isAdmin = false) : '';
  }

  // Method to log out the user
  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    // Navigate to the home page after logging out
    this.router.navigate(['/']);
    // Display a toast message to confirm the logout
    this.snackBar.open(APP_CONSTANTS['loggedOut'], 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
