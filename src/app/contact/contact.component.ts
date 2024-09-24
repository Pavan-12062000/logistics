import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactFormData = {
    firstname: '',
    lastname: '',
    email: '',
    comments: ''
  };
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' = 'info';
  showNotification: boolean = false;

  constructor(private apiService: ApiService, private notificationService: NotificationService) { }

  submitContactForm(contactForm: NgForm) {
    // Mark all controls as touched to trigger validation messages
    if (contactForm.invalid) {
      Object.keys(contactForm.controls).forEach(key => {
        const control = contactForm.controls[key];
        control.markAsTouched();
      });
      this.notificationService.showNotification('Please enter all the required fields*.', 'error');
      return; // Stop further execution if the form is invalid
    }

    const params = {
      firstname: this.contactFormData.firstname,
      lastname: this.contactFormData.lastname,
      email: this.contactFormData.email,
      comments: this.contactFormData.comments
    };
    const body = { params: JSON.stringify(params) };
    
    this.apiService.contact(body).subscribe({
      next: (response: any) => {
        this.notificationService.showNotification('Your Contact Form has been submitted. Our customer service will contact you shortly.', 'success');
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);

        // Clear the form
        contactForm.resetForm();
        this.contactFormData = {
          firstname: '',
          lastname: '',
          email: '',
          comments: ''
        };
      },
      error: (error) => {
        this.notificationService.showNotification('Failed to submit the form. Please try again later.', 'error');
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    });
  }
}
