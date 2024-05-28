import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactFormData: any = {}; // Initialize form data object
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'info' = 'info';
  showNotification: boolean = false;

  constructor(private apiService: ApiService) { }

  submitContactForm(contactForm: any) {
    console.log(this.contactFormData); // Just for testing, replace with your actual logic
    const params = {
      firstname: this.contactFormData.firstname,
      lastname: this.contactFormData.lastname,
      email: this.contactFormData.email,
      comments: this.contactFormData.comments
    }
    const body = { params: JSON.stringify(params) };
    this.apiService.contact(body).subscribe((response: any) => {
      console.log(response);
      this.notificationMessage = 'Your Contact Form has been submitted. Our customer service will contact you shortly.';
      this.notificationType = 'success';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
      contactForm.resetForm(); // Clear the form
      this.contactFormData = {}; // Clear form data
      contactForm.form.markAsPristine();
      contactForm.form.markAsUntouched();
    }, error => {
      console.error(error);
      this.notificationMessage = 'Failed to submit the form. Please try again later.';
      this.notificationType = 'error';
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    });
  }
}
