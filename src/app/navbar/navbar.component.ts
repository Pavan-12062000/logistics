import { Component, NgModule, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CustomLink } from './custom-link';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})

export class NavbarComponent implements OnInit{
  background = 'primary';
  links: CustomLink[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    let route: Route;
    for (route of this.router.config) {
      let labelData: string | undefined = undefined;
      if (route.data) {
        labelData = route.data['label'];
        if (labelData) {
          const link: CustomLink = {
            path: `/${route.path}`,
            label: labelData,
          };
          this.links.push(link);
        }
      }
    }
    console.log(JSON.stringify(this.links));
  }
}
