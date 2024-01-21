import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { BookService } from '../service/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;
  let mockActivatedRoute: any; // Adjust the type based on your actual ActivatedRoute implementation
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockBookService: jasmine.SpyObj<BookService>;

  beforeEach(() => {
    mockActivatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy('get') } } };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockBookService = jasmine.createSpyObj('BookService', ['getBookById', 'addNewBook', 'updateBookById']);

    TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: BookService, useValue: mockBookService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch book details for editing on ngOnInit', fakeAsync(() => {
    const mockBookId = '1';
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(mockBookId);
    const mockBookResponse = { title: 'Mock Book', author: 'Mock Author' };
    mockBookService.getBookById.and.returnValue(of(mockBookResponse));

    component.ngOnInit();
    tick();

    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockBookService.getBookById).toHaveBeenCalledWith(mockBookId);
    expect(component.formTitle).toEqual('Edit Book');
    expect(component.submitBtnText).toEqual('Update');
    expect(component.book).toEqual(mockBookResponse);
  }));

  it('should handle error fetching book details on ngOnInit', fakeAsync(() => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue('1');
    mockBookService.getBookById.and.returnValue(throwError('Error fetching book'));
    spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(mockBookService.getBookById).toHaveBeenCalledWith('1');
    expect(mockSnackBar.open).toHaveBeenCalledWith('Failed to load book details', 'Close', jasmine.any(Object));
  }));

});
