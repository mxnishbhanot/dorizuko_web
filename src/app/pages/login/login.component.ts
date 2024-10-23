import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // In a real application, you'd want to implement proper authentication
    if (this.email && this.password) {
      // Navigate to home after a successful login (mocking success here)
      this.router.navigate(['/']);
    }
  }
}
