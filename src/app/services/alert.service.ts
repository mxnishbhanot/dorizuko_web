import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private snackBar: MatSnackBar) { }

  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
    panelClass: ['modern-snackbar']
  };

  success(message: string): void {
    this.showSnackBar(message, 'success-snackbar');
  }

  error(message: string): void {
    this.showSnackBar(message, 'error-snackbar');
  }

  info(message: string): void {
    this.showSnackBar(message, 'info-snackbar');
  }

  private showSnackBar(message: string, extraClass: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      panelClass: ['modern-snackbar', extraClass]
    });
  }
}
