import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from './header.component';
import { BookService } from '../service/book.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockBookService = jasmine.createSpyObj('BookService', ['getBooks']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: BookService, useValue: mockBookService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize properties on component creation', async () => {
    fixture.detectChanges(); // Trigger component creation
  
    // Wait for asynchronous tasks to complete
    await fixture.whenStable();
  
    expect(component.searchTerm).toEqual('');

  });
  
  

  it('should check login status in ngOnInit', () => {
    localStorage.setItem('id', '1');
    localStorage.setItem('role', 'admin');
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
    expect(component.isAdmin).toBeTrue();
  });

  it('should navigate to cart page on goToCart()', () => {
    component.goToCart();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cart']);
  });

  it('should search for a book successfully', fakeAsync(() => {
    const mockResponse = [{ title: 'Book Title' }];
    mockBookService.getBooks.and.returnValue(of(mockResponse));

    component.searchTerm = 'Book Title';
    component.searchBook();
    tick();

    expect(mockBookService.getBooks).toHaveBeenCalledWith('Book Title');
  }));

  it('should handle search failure with a snackbar message', fakeAsync(() => {
    mockBookService.getBooks.and.returnValue(throwError('Error searching for books'));
  
    component.searchTerm = 'Book Title';
    component.searchBook();
    tick();
  
    expect(mockBookService.getBooks).toHaveBeenCalledWith('Book Title');
  
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error occured while searching', 'Close', jasmine.any(Object));
  }));
  


  it('should clear local storage and navigate to home on logout()', () => {
    localStorage.setItem('id', '1');
    localStorage.setItem('role', 'admin');
  
    // Stub the MatSnackBar.open method directly
    mockSnackBar.open.and.stub();
  
    component.logout();
  
    expect(localStorage.getItem('id')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(component.isLoggedIn).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  
    // Check if MatSnackBar.open was called with the expected parameters
    expect(mockSnackBar.open).toHaveBeenCalledWith('Logged out successfully', 'Close', jasmine.any(Object));
  });
  
  
});
