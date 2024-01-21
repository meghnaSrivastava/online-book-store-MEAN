// Importing necessary modules and components from Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants';

// Component decorator with metadata for Angular
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  // Initializing properties for the book form
  book: any = {};
  formTitle: string = 'Add Book'; // Default form title for adding
  submitBtnText: string = 'Save'; // Default submit button text for adding

  // Constructor with dependency injection for required services
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private snackBar: MatSnackBar
  ) { }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Check if there is a bookId in the route (for editing)
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      // Fetch the book details for editing
      this.bookService.getBookById(bookId).subscribe(
        (response) => {
          this.book = response;
        },
        (error) => {
          // Display error message in a snackbar if book fetch fails
          this.snackBar.open(APP_CONSTANTS['bookFetchFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        });

      // Update form title and submit button text for editing
      this.formTitle = 'Edit Book';
      this.submitBtnText = 'Update';
    }
  }

  // Method triggered on form submission
  onSubmit(): void {
    // Check if it's an 'Add Book' form or an 'Edit Book' form
    if (this.formTitle === 'Add Book') {
      // Add new book and display success/error message in a snackbar
      this.bookService.addNewBook(this.book).subscribe(
        (response) => {
          this.snackBar.open(APP_CONSTANTS['bookAdded'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
        (error) => {
          // Display error message in a snackbar if book addition fails
          this.snackBar.open(APP_CONSTANTS['boodAdditionFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        });
    } else {
      // Update existing book and display success/error message in a snackbar
      this.bookService.updateBookById(this.book).subscribe(
        (response) => {
          this.snackBar.open(APP_CONSTANTS['bookUpdated'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
        (error) => {
          // Display error message in a snackbar if book updation fails
          this.snackBar.open(APP_CONSTANTS['bookUpdationFailed'], 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        });
    }

    // Navigate back to the book list page after form submission
    this.router.navigate(['/']);
  }
}
