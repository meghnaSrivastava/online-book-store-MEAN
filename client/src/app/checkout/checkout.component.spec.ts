import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockCartService: jasmine.SpyObj<CartService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockCartService = jasmine.createSpyObj('CartService', ['getCartItems']);
    mockOrderService = jasmine.createSpyObj('OrderService', ['placeOrder']);

    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: CartService, useValue: mockCartService },
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page if user is not logged in on confirmOrder', () => {
    // Arrange
    localStorage.removeItem('id'); // Simulate user not logged in
  
    // Act
    component.confirmOrder();
  
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
  

  it('should place an order successfully', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    component.totalAmount = 50;
    component.bookIds = ['1', '2'];
    mockOrderService.placeOrder.and.returnValue(of(undefined));

    // Act
    component.confirmOrder();
    tick();

    // Assert
    const orderDetails = { bookIds: ['1', '2'], userId: 'mockUserId', amount: 50 };
    expect(mockOrderService.placeOrder).toHaveBeenCalledWith(orderDetails);
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['orderPlaced'], 'Close', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-history']);
  }));

  it('should handle error when placing an order', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    mockOrderService.placeOrder.and.returnValue(throwError('Error placing order'));
    spyOn(console, 'error');

    // Act
    component.confirmOrder();
    tick();

    // Assert
    const orderDetails = { bookIds: [], userId: 'mockUserId', amount: 0 };
    expect(mockOrderService.placeOrder).toHaveBeenCalledWith(orderDetails);
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['orderFailed'], 'Close', jasmine.any(Object));
    // cartItems should not be updated on error
    expect(component.bookIds).toEqual([]);
}));


  it('should get and calculate total amount from cart items', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    const mockCartItems = [
      { _id: '1', book: { price: 20 } },
      { _id: '2', book: { price: 30 } },
    ];
    mockCartService.getCartItems.and.returnValue(of(mockCartItems));

    // Act
    component.getCartItems();
    tick();

    // Assert
    expect(mockCartService.getCartItems).toHaveBeenCalledWith('mockUserId');
    expect(component.totalAmount).toEqual(50);
  }));


  it('should handle error when getting cart items', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    mockCartService.getCartItems.and.returnValue(throwError('Error getting cart items'));
    spyOn(console, 'error');

    // Act
    component.getCartItems();
    tick();

    // Assert
    expect(mockCartService.getCartItems).toHaveBeenCalledWith('mockUserId');
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['amountFetchFailed'], 'Close', jasmine.any(Object));
    // totalAmount should not be updated on error
    expect(component.totalAmount).toEqual(0);
    expect(component.bookIds).toEqual([]);
  }));

});
