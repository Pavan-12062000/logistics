import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms'

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})
export class TrackComponent {
  TrackOrder = this.formBuilder.group({
    trackingid: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
  });

  constructor(private formBuilder: FormBuilder){  }

  public counts = ["Order Received", "Order Packed", "Shipment in Progress", "Shipment arrived to Hub","Order Delivered"];
  public orderStatus = "Order Packed"

  getStatus(trackingid: any){
    console.log("sdbcvidsvcdfvidfsviojfdviojefiovjdfsiov",trackingid);
  }

}
