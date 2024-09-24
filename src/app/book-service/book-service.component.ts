import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.component.html',
  styleUrls: ['./book-service.component.css']
})
export class BookServiceComponent implements OnInit{

  selectedServiceType: string = '';
  serviceType: string = '';
  serviceTypes = ['Delivery', 'Express Delivery', 'International Shipping'];
  countries = ['USA', 'Canada', 'UK', 'Australia', 'India']; // Example list of countries
  selectedPickupCountry: string = '';
  fileName: string = '';

  formStep: number = 1; // To track the form step for the progress indicator

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
    }
    this.serviceType = history.state.serviceType;
    if (this.serviceType && this.serviceTypes.includes(this.serviceType)) {
      this.selectedServiceType = this.serviceType;
    }else{
      this.selectedServiceType = '';
    }
    console.log('Service Type:', this.selectedServiceType);
  }

  // Go to the next form step
  nextStep() {
    if (this.formStep < 3) {
      this.formStep++;
    }
  }

  // Go to the previous form step
  previousStep() {
    if (this.formStep > 1) {
      this.formStep--;
    }
  }

  onServiceTypeChange(event: any) {
    this.selectedServiceType = event.target.value;
  }

  onPickupCountryChange(event: any) {
    this.selectedPickupCountry = event.target.value;
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  bookService(form: NgForm): void {
    if (form.valid) {
      // Simulate a delay with loading spinner
      document.querySelector('.spinner-overlay')?.classList.add('visible');
      setTimeout(() => {
        console.log('Booking Details:', form.value);
        // Hide spinner and show success message
        document.querySelector('.spinner-overlay')?.classList.remove('visible');
        document.querySelector('.success-message')?.classList.add('visible');
      }, 2000); // 2-second delay to simulate submission
    }
  }
}
