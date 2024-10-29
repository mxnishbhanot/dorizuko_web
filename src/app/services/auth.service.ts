import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private idToken: string | null = null;
  constructor() {}


  async login({ email, password }: { email: string; password: string }): Promise<boolean> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      this.idToken = await userCredential.user.getIdToken();

      return true;
    } catch (error: any) {
      console.error('Login failed', error?.message || error);
      return false;
    }
  }

  getToken(): string | null {
    return this.idToken;
  }

  logout(): void {
    this.idToken = null;
  }
}