import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService) {}

  public loginFailed: boolean = false;
  loginEmail: string | undefined;
  loginPassword: string | undefined;
  registerEmail: string | undefined;
  registerFirstname: string | undefined;
  registerUsername: string | undefined;
  registerPassword: string | undefined;
  registerRepassword: string | undefined;

  public tabIndex = 0;
  public showPassword: boolean = false;
  public showRegisterPassword: boolean = false;
  public showRegisterRePassword: boolean = false;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleRegisterRePasswordVisibility(): void {
    this.showRegisterRePassword = !this.showRegisterRePassword;
  }

  public toggleRegisterPasswordVisibility(): void {
    this.showRegisterPassword = !this.showRegisterPassword;
  }

  public register(event: Event): void {
    event.preventDefault();
    
    // Basic form validation checks
    if (!this.registerUsername || !this.registerFirstname || !this.registerEmail || !this.registerPassword || !this.registerRepassword) {
      console.log('All fields are required');
      return;
    }
  
    if (this.registerPassword !== this.registerRepassword) {
      console.log('Passwords do not match');
      return;
    }
  
    this.registerUser(event);
  }

  public login(event: Event): void {
    this.loginUser(event);
  }

  public registerUser(event: Event): void {
    const params = {
      username: this.registerUsername,
      firstname: this.registerFirstname,
      email: this.registerEmail,
      password: this.registerPassword
    };
    const body = { params: JSON.stringify(params) };
    this.apiService.registerUser(body).subscribe((response: any) => {
      console.log('User created successfully:', response);
      
      // Only switch tab if registration is successful
      const tabCount = 2;
      this.tabIndex = (this.tabIndex + 1) % tabCount;
    }, (error: any) => {
      console.error('Error creating user:', error);
    });
  }

  public loginUser(event: Event): void {
    event.preventDefault();
    const params = {
      email: this.loginEmail,
      password: this.loginPassword
    };
    const body = { params: JSON.stringify(params) };
    this.apiService.loginUser(body).subscribe((response: any) => {
      if (response.length === 1) {
        this.authService.setAuthenticated(true);
        this.authService.setUsername(response[0].firstname); // Set the username here
        this.router.navigate(['/home']);
      } else {
        this.loginFailed = true;
        console.log('login failed', this.loginFailed);
      }
      console.log('User logged in successfully:', response);
    }, (error: any) => {
      console.error('Error login user:', error);
      this.loginFailed = true;
    });
  }
}
