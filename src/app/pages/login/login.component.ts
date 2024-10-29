import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>,
    private alertService: AlertService,
    private dialog: MatDialog,
    private authService: AuthService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void { }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      try {
        const isLoggedin = await this.authService.login(this.loginForm.value);
        if (isLoggedin) {
          this.dialogRef.close(this.loginForm.value);
          this.alertService.success('Login successful!');
        } else {
          this.alertService.error('Please enter valid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.alertService.error('An error occurred. Please try again later.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openSignupModal(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
    // this.loginService.openLoginModal();
    this.dialog.open(SignupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'signup-modal-panel',
      disableClose: true,
      autoFocus: false
    });
  }
  openForgotPasswordModal(event: Event) {
    event.preventDefault();
    this.dialogRef.close();
    // this.loginService.openLoginModal();
    this.dialog.open(ForgotPasswordComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'forgot-pass-modal-panel',
      disableClose: true,
      autoFocus: false
    });
  }
}
