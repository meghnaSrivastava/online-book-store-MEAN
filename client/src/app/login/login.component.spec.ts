import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    // Create spy objects
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockLoginService = jasmine.createSpyObj('LoginService', ['loginUser']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: LoginService, useValue: mockLoginService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform user login successfully', fakeAsync(() => {
    // Arrange
    const mockResponse = { jwt: 'mockToken', user: { _id: '123', firstName: 'John', lastName: 'Doe', role: 'user' } };
    mockLoginService.loginUser.and.returnValue(of(mockResponse));

    // Act
    component.login();
    tick();

    // Assert
    expect(mockLoginService.loginUser).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['loggedIn'], 'Close', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should handle login failure', fakeAsync(() => {
    // Arrange
    const mockError = { error: { message: 'Invalid credentials' } };
    mockLoginService.loginUser.and.returnValue(throwError(mockError));
    spyOn(console, 'error');

    // Act
    component.login();
    tick();

    // Assert
    expect(console.error).toHaveBeenCalledWith('Login failed:', mockError);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Invalid credentials', 'Close', jasmine.any(Object));
  }));

  it('should navigate to the registration page', () => {

    // Act
    component.register();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });
});
