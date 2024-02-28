import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ServicesComponent } from './services/services.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { label: 'Home' } },
  { path: 'about', component: AboutComponent, data: { label: 'About' } },
  { path: 'services', component: ServicesComponent, data: { label: 'Services'}},
  { path: 'track', component: TrackComponent, data: { label: 'Track Goods'}},
  { path: 'contact', component: ContactComponent, data: { label: 'Contact Us' } },
  { path: 'login', component: LoginComponent, data: { label: 'Login/Register'}},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

const routeOptions: ExtraOptions = {
  enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routeOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
