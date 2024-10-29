import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        // Handle successful login
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.dialogRef.close(this.loginForm.value);
      }, 1500);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  openSignupModal(event: Event){
    event.preventDefault();
    this.dialogRef.close();
    // this.loginService.openLoginModal();
    this.dialog.open(SignupComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'signup-modal-panel',
      disableClose: true,
      autoFocus: false
    });
  }
  openForgotPasswordModal(event: Event){
    event.preventDefault();
    this.dialogRef.close();
    // this.loginService.openLoginModal();
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'forgot-pass-modal-panel',
      disableClose: true,
      autoFocus: false
    });
  }
}
