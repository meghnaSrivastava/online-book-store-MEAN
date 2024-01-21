// Import the Component decorator from Angular core
import { Component } from '@angular/core';

// Component decorator to define the metadata for the component
@Component({
  // Selector used to identify the component in HTML
  selector: 'app-root',

  // HTML template file associated with the component
  templateUrl: './app.component.html',

  // CSS styles associated with the component
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Property to store the title of the application
  title = 'online-bookstore';
}
