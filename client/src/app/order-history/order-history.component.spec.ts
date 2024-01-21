import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { OrderHistoryComponent } from './order-history.component';
import { OrderService } from '../service/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getOrderHistory']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch order history successfully', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    const mockResponse = [{ id: 1, date: '2022-01-01', total: 50 }];
    mockOrderService.getOrderHistory.and.returnValue(of(mockResponse));

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(mockOrderService.getOrderHistory).toHaveBeenCalledWith('mockUserId');
    expect(component.orders).toEqual(mockResponse);
  }));

  it('should handle error when fetching order history', fakeAsync(() => {
    // Arrange
    localStorage.setItem('id', 'mockUserId');
    const mockError = 'Error fetching order history';
    mockOrderService.getOrderHistory.and.returnValue(throwError(mockError));
    spyOn(console, 'error');

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(mockOrderService.getOrderHistory).toHaveBeenCalledWith('mockUserId');
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['orderHistoryFetchFailed'], 'Close', jasmine.any(Object));
    expect(console.error).toHaveBeenCalledWith('Error fetching order history:', mockError);
  }));

  it('should navigate to login page if user is not logged in', () => {
    // Arrange
    localStorage.removeItem('id');
    spyOn(localStorage, 'clear');

    // Act
    component.ngOnInit();

    // Assert
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
