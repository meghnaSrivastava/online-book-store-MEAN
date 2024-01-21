// Import necessary modules from Angular and Angular Material
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

// Importing components
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BookListComponent } from './book-list/book-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { BookFormComponent } from './book-form/book-form.component';


// NgModule decorator to define the metadata for the module
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    CartComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    BookFormComponent
  ],
  // Importing external modules required for this module
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule
  ],
  // Providers can be added here if any services need to be injected
  providers: [],
  // The root component that Angular creates and inserts into the index.html file
  bootstrap: [AppComponent],
})
export class AppModule { }
