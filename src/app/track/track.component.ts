import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notifications/notification.service';
import { ApiService } from '../api.service';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  trackingId: number | undefined;
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' = 'info';
  showNotification: boolean = false;
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  currentStep: number = 0; // Initial step
  numSteps = 6;
  showProgressBar = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userRole = this.authService.getRole();
  }

  // Submitting form to track order
  submitTrackForm(event: Event) {
    event.preventDefault();
    if (!this.authService.isAuthenticated()) {
      this.notificationService.showNotification('Please login to continue.', 'info');
      this.router.navigate(['/login']);
    } else {
      if (!this.trackingId) {
        this.notificationService.showNotification('Please fill out all required fields correctly.', 'error');
        return;
      } else {
        const params = { trackingId: this.trackingId };
        const body = { params: JSON.stringify(params) };
        this.apiService.trackOrder(body).subscribe((response: any) => {
          const statusCode = response[0].status_code; // Get status code from the response
          // Ensure status_code is between 1 and 6, otherwise set it to the closest valid value.
          this.currentStep = Math.min(Math.max(statusCode, 1), 6);

          this.showProgressBar = true;
          this.cdr.detectChanges(); // Manually trigger change detection
        });
      }
    }
  }

  // Show "Next" button based on role
  showNextButton() {
    return this.userRole === 'admin' || this.userRole === 'delivery';
  }

  // Move to next step
  nextStep() {
    if (this.currentStep < this.numSteps) {
      this.currentStep++;
    } else {
      this.currentStep = this.numSteps;
    }
    this.cdr.detectChanges(); // Trigger change detection after updating the step

    const params = { trackingId: this.trackingId, status_code: this.currentStep };
    const body = { params: JSON.stringify(params) };
    this.apiService.updateOrderStatus(body).subscribe((response: any) => {
      console.log("response", response);
    });
  }

}
