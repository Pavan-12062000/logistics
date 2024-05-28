import { Component, OnInit } from '@angular/core';
import { CustomLink } from './custom-link';
import { Router, Route } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  background = 'primary';
  links: CustomLink[] = [];
  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeLinks();
    this.updateAuthStatus();

    this.authService.authStatusChanged.subscribe((status: boolean) => {
      this.updateAuthStatus();
    });

    this.authService.usernameChanged.subscribe((username: string | null) => {
      this.username = username;
      console.log("Username updated in NavbarComponent:", this.username);
    });
  }

  private initializeLinks(): void {
    for (let route of this.router.config) {
      if (route.data && route.data['label'] && route.data['label'] != 'Login/Register') {
        this.links.push({
          path: `/${route.path}`,
          label: route.data['label'],
        });
      }
    }
  }

  private updateAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
