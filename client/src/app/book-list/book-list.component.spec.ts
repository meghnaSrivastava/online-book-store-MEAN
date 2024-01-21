import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BookListComponent } from './book-list.component';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../service/shared.service';
import { APP_CONSTANTS } from '../shared/constants';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockBookService: jasmine.SpyObj<BookService>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks', 'deleteBookById']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['searchResults$']);
    mockSharedService.searchResults$ = of([]); // Initialize with an empty array

    TestBed.configureTestingModule({
      declarations: [BookListComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: BookService, useValue: mockBookService },
        { provide: CartService, useValue: mockCartService },
        { provide: SharedService, useValue: mockSharedService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books on ngOnInit', fakeAsync(() => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', price: 12, rating: 3 },
      { id: 2, title: 'Book 2', author: 'Author 2', price: 12, rating: 3 },
    ];
    mockBookService.getBooks.and.returnValue(of(mockBooks));
    mockSharedService.searchResults$ = of(mockBooks); 

    component.ngOnInit();
    tick();

    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.books).toEqual(mockBooks);
  }));

  it('should fetch books using getBooks()', fakeAsync(() => {
    // Arrange
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', price: 12, rating: 3 },
      { id: 2, title: 'Book 2', author: 'Author 2', price: 12, rating: 3 },
    ];
    mockBookService.getBooks.and.returnValue(of(mockBooks));

    // Act
    component.getBooks();
    tick();

    // Assert
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(component.books).toEqual(mockBooks);
  }));

  it('should handle error while fetching books using getBooks()', fakeAsync(() => {
    // Arrange
    const errorMessage = 'Error fetching books';
    mockBookService.getBooks.and.returnValue(throwError(errorMessage));
    spyOn(console, 'error');

    // Act
    component.getBooks();
    tick();

    // Assert
    expect(mockBookService.getBooks).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching books', errorMessage);
  }));

  it('should navigate to edit book page', () => {
    // Arrange
    const mockBookId = '1';

    // Act
    component.editBookPage(mockBookId);

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/book/edit/${mockBookId}`]);
  });

  it('should add book to cart successfully', fakeAsync(() => {
    // Arrange
    const mockBookId = '1';
    localStorage.setItem('id', 'mockUserId'); // Set a mock user id
    mockCartService.addToCart.and.returnValue(of(undefined));

    // Act
    component.addToCart(mockBookId);
    tick();

    // Assert
    expect(mockCartService.addToCart).toHaveBeenCalledWith({ userId: 'mockUserId', bookId: mockBookId });
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['addedToCart'], 'Close', jasmine.any(Object));
  }));

  it('should handle error adding book to cart', fakeAsync(() => {
    // Arrange
    const mockBookId = '1';
    localStorage.setItem('id', 'mockUserId'); // Set a mock user id
    mockCartService.addToCart.and.returnValue(throwError('Error adding to cart'));
    spyOn(console, 'error');

    // Act
    component.addToCart(mockBookId);
    tick();

    // Assert
    expect(mockCartService.addToCart).toHaveBeenCalledWith({ userId: 'mockUserId', bookId: mockBookId });
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['cardAdditionFailed'], 'Close', jasmine.any(Object));
  }));

  it('should navigate to login page if user is not logged in', () => {
    // Arrange
    const mockBookId = '1';
    localStorage.removeItem('id'); // Simulate user not logged in

    // Act
    component.addToCart(mockBookId);

    // Assert
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  beforeEach(() => {
    // Set up spy on localStorage.clear
    spyOn(localStorage, 'clear');
  });

});
