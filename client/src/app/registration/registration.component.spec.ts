import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { RegistrationService } from '../service/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants';
import { FormsModule } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockRegistrationService: jasmine.SpyObj<RegistrationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockRegistrationService = jasmine.createSpyObj('RegistrationService', ['registerUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule],
      providers: [
        { provide: RegistrationService, useValue: mockRegistrationService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user successfully', fakeAsync(() => {
    // Arrange
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.email = 'john.doe@example.com';
    component.password = 'password123';

    mockRegistrationService.registerUser.and.returnValue(of(undefined));

    // Act
    component.register();
    tick();

    // Assert
    const userDetails = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };
    expect(mockRegistrationService.registerUser).toHaveBeenCalledWith(userDetails);
    expect(mockSnackBar.open).toHaveBeenCalledWith(APP_CONSTANTS['registration'], 'Close', jasmine.any(Object));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should handle error when registering user', fakeAsync(() => {
    // Arrange
    const mockError = 'Error registering user';
    mockRegistrationService.registerUser.and.returnValue(throwError({ error: { message: mockError } }));
    spyOn(console, 'error');

    // Act
    component.register();
    tick();

    // Assert
    const userDetails = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    expect(mockRegistrationService.registerUser).toHaveBeenCalledWith(userDetails);
    expect(mockSnackBar.open).toHaveBeenCalledWith(mockError, 'Close', jasmine.any(Object));
    expect(console.error).toHaveBeenCalledWith('Registration failed:', { error: { message: mockError } });
  }));

  it('should navigate to login page', () => {

    // Act
    component.login();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
