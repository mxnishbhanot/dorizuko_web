import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatToolbarModule, MatBadgeModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dorizuko_web';
  cartItemCount = 0;

  constructor(private dialog: MatDialog) {

  }


  openModal(type: string): void {
    if (type === "login") {
      this.dialog.open(LoginComponent, {
        width: '400px',
        height: 'auto',
        panelClass: 'login-modal-panel',
        disableClose: true,
        autoFocus: false
      });
    }
    if (type === "signup") {
      this.dialog.open(SignupComponent, {
        width: '400px',
        height: 'auto',
        panelClass: 'signup-modal-panel',
        disableClose: true,
        autoFocus: false
      });
    }
  }
}
