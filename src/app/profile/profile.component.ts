import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = {
    name: 'John Doe',
    role: 'Logistics Manager',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    location: 'New York, USA'
  };

  editProfile() {
    console.log('Edit profile clicked!');
    // Implement edit profile logic here
  }

}
