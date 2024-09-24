import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { response } from 'express';
import { setFlagsFromString } from 'v8';

interface ShipmentType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-getaquote',
  templateUrl: './getaquote.component.html',
  styleUrls: ['./getaquote.component.css']
})
export class GetaquoteComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  getaquoteEmail: string = '';
  shipmentFrom: string = '';
  shipmentTo: string = '';
  weight: number | undefined ;
  selectedPickupCountry: string = '';
  selectedDeliveryCountry: string = '';
  countries: string[] = ['Country1', 'Country2', 'Country3'];
  serviceTypes = ['Delivery', 'Express Delivery', 'International Shipping'];
  selectedServiceType: string = '';

  isAuthenticated: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.username = this.authService.getUsername();
    this.authService.authStatusChanged.subscribe(status => {
      this.isAuthenticated = status;
    });
    this.authService.usernameChanged.subscribe(name => {
      this.username = name;
    });
  }

  submitGetaquoteForm(form: any) {
    if (form.valid) {
      // Handle form submission logic here
      console.log('Form Submitted', form.value);
    }
  }

  onServiceTypeChange(event: any) {
    this.selectedServiceType = event.target.value;
  }
}
