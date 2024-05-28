import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
  trackingId: number | undefined
  trackEmail: string = '';
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' = 'info';
  showNotification: boolean = false;

  public counts = ["Order Received", "Order Packed", "Shipment in Progress", "Shipment arrived to Hub","Order Delivered"];
  public orderStatus = "Order Packed";

  constructor(private authService: AuthService, private router: Router) {}

  submitTrackForm(event: Event) {
    if (!this.trackingId && !this.trackEmail) {
      this.notificationMessage = 'Please fill out all required fields correctly.';
      this.notificationType = 'error';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
      return;
    }

    console.log("if condition", this.trackingId, this.trackEmail);
    console.log("submit track");

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.notificationMessage = 'Please login to continue.';
      this.notificationType = 'info';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }
  }
}
