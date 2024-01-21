// Importing necessary modules and components from Angular
import { Component, OnInit } from '@angular/core';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../service/shared.service';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  // Initializing properties for the book list component
  books: any = [];
  isAdmin: boolean = false; // Set this based on the user's role

  // Constructor with dependency injection for required services
  constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    // Subscribe to searchResults$ observable from SharedService
    this.sharedService.searchResults$.subscribe((results) => {
      this.books = results;
    });
  }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Check user's role and set isAdmin accordingly
    let role = localStorage.getItem('role');
    if (role && role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    // Fetch books for display
    this.getBooks();
  }

  // Method to fetch books from the book service
  getBooks() {
    this.bookService.getBooks('').subscribe(
      (response) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  // Method to navigate to the edit book page
  editBookPage(bookId: string) {
    this.router.navigate([`/book/edit/${bookId}`]);
  }

  // Method to add a book to the user's cart
  addToCart(bookId: string) {
    if (localStorage.getItem('id')) {
      // Prepare cart details and call addToCart service
      let cartDetails = { userId: localStorage.getItem('id'), bookId: bookId };
      this.cartService.addToCart(cartDetails).subscribe(
        () => {
          // Display success message in a snackbar
          this.snackBar.open(APP_CONSTANTS['addedToCart'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
        (error) => {
          // Display error message in a snackbar if cart addition fails
          this.snackBar.open(APP_CONSTANTS['cardAdditionFailed'], 'Close', {
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

  // Method to delete a book by its ID
  deleteBook(bookId: string) {
    this.bookService.deleteBookById(bookId).subscribe(
      () => {
        // Display success message in a snackbar and refresh books
        this.snackBar.open(APP_CONSTANTS['bookDeleted'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.getBooks();
      },
      (error) => {
        // Display error message in a snackbar if book deletion fails
        this.snackBar.open(APP_CONSTANTS['bookDeletionFailed'], 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }
}
