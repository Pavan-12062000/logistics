import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private notificationService: NotificationService) {}

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
      this.notificationService.showNotification('Please enter all the required fields*.', 'error');
      return;
    }
  
    if (this.registerPassword !== this.registerRepassword) {
      this.notificationService.showNotification("Passwords doesn't match", 'error');
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
      password: this.registerPassword,
      role: 'client'
    };
    const body = { params: JSON.stringify(params) };
    this.apiService.registerUser(body).subscribe((response: any) => {
      this.notificationService.showNotification('Profile successfully created.', 'success');
      
      // Only switch tab if registration is successful
      const tabCount = 2;
      this.tabIndex = (this.tabIndex + 1) % tabCount;
    }, (error: any) => {
      this.notificationService.showNotification('Unexpected error occured. Please try again after sometime.', 'error');
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
        this.authService.setUsername(response[0].firstname);
        this.authService.setRole(response[0].role);
        this.notificationService.showNotification('User logged in successfully.', 'success'); // Set the username here
        this.router.navigate(['/home']);
      } else {
        this.loginFailed = true;
        this.notificationService.showNotification('Please enter correct credentials', 'error');
      }
    }, (error: any) => {
      console.error('Error login user:', error);
      this.notificationService.showNotification('Unexpected error occured. Please try again after sometime.', 'error');
      this.loginFailed = true;
    });
  }
}
