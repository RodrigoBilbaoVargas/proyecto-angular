import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  currentUser = signal<User | null>(null);
  user$ = user(this.auth);

  constructor() {
    this.user$.subscribe(user => {
      this.currentUser.set(user);
    });
  }

  async register(email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: credential.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async login(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return { success: true, user: credential.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/']);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}