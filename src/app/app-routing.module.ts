import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TrackComponent } from './track/track.component';
import { GetaquoteComponent } from './getaquote/getaquote.component';
import { ProfileComponent } from './profile/profile.component';
import { BookServiceComponent } from './book-service/book-service.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { label: 'Home' } },
  { path: 'about', component: AboutComponent, data: { label: 'About' } },
  { path: 'track', component: TrackComponent, data: { label: 'Track Goods'}},
  { path: 'quote', component: GetaquoteComponent, data: { label: 'Get a Quote'}},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component: LoginComponent},
  { path: 'getaquote', component: GetaquoteComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'bookaservice', component: BookServiceComponent},
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
