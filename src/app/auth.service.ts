import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated: boolean = false;
  private username: string | null = null;
  private role: string | null = null;
  authStatusChanged: Subject<boolean> = new Subject<boolean>();
  usernameChanged: Subject<string | null> = new Subject<string | null>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isLocalStorageAvailable()) {
      const storedAuthenticated = localStorage.getItem('authenticated');
      const storedUsername = localStorage.getItem('username');
      const storedRole = localStorage.getItem('role');

      this.authenticated = storedAuthenticated === 'true';
      this.username = storedUsername;
      this.role = storedRole;
    }
  }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('authenticated', JSON.stringify(isAuthenticated));
    }
    this.authStatusChanged.next(this.authenticated);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setUsername(username: string | null): void {
    this.username = username;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('username', username || '');
    }
    this.usernameChanged.next(this.username);
  }

  getUsername(): string | null {
    return this.username;
  }

  setRole(role: string | null): void {
    this.role = role;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('role', role || '');
    }
  }

  getRole(): string | null {
    return this.role;
  }

  logout(): void {
    this.setAuthenticated(false);
    this.setUsername(null);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('username');
    }
  }
}
