import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated: boolean = false;
  private username: string | null = null;
  authStatusChanged: Subject<boolean> = new Subject<boolean>();
  usernameChanged: Subject<string | null> = new Subject<string | null>();

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated;
    this.authStatusChanged.next(this.authenticated);
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setUsername(username: string | null): void {
    this.username = username;
    this.usernameChanged.next(this.username);
  }

  getUsername(): string | null {
    return this.username;
  }

  logout(): void {
    this.setAuthenticated(false);
    this.setUsername(null);
  }
}
