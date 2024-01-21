import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCartService = jasmine.createSpyObj('CartService', ['removeFromCart', 'getCartItems']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should remove item from cart and update cart items on success', fakeAsync(() => {
    // Arrange
    const mockItem = { _id: '1', book: { price: 10 } };
    mockCartService.removeFromCart.and.returnValue(of(undefined));
    mockCartService.getCartItems.and.returnValue(of([mockItem]));
  
    // Act
    component.removeFromCart(mockItem);
    tick(); // Wait for asynchronous operations to complete
  
    // Assert
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['removeFromCart'], 'Close', jasmine.any(Object));
    expect(mockCartService.getCartItems).toHaveBeenCalled();
    expect(component.cartItems).toEqual([mockItem]);
  }));


  it('should handle error when removing item from cart', fakeAsync(() => {
    // Arrange
    const mockItem = { _id: '1', book: { price: 10 } };
    mockCartService.removeFromCart.and.returnValue(throwError('Error removing from cart'));
    spyOn(console, 'error');
  
    // Act
    component.removeFromCart(mockItem);
    tick();
  
    // Assert
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith('1');
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['cartRemovalFailed'], 'Close', jasmine.any(Object));
    // cartItems should not be updated on error
    expect(component.cartItems).toEqual([]);
  }));

});
