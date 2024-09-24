import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private apiService: ApiService, private notificationService: NotificationService) {}

  email: string = '';

  subscribed(form : NgForm) {
    if(form.invalid) {
      form.controls['email'].markAsTouched();
      return;
    }
    console.log('Subscribed with email:', this.email);
    const params = {
      email: this.email
    };
    const body ={ params: JSON.stringify(params) };
    this.apiService.subscribeEmail(body).subscribe((response: any) => {
      if (response.rowCount > 0) {
        this.notificationService.showNotification('Subscribed successfully.', 'success');
      } else if (response.message === 'Email already subscribed') {
        this.notificationService.showNotification('Email already subscribed.', 'error');
      }
      form.reset();
    }, (error: any) => {
      this.notificationService.showNotification('Unexpected error occured. Please try again after sometime.', 'error');
      console.error('Failed to subscribe:', error);
    });
  }
}
