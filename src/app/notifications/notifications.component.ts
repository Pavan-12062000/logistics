import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() showNotification: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      if(notification.message){
      console.log('Notification received:', notification);
      this.message = notification.message;
      this.type = notification.type;
      this.showNotification = true;

      // Hide the notification after 3 seconds
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    }else{
      this.showNotification = false;
    }
    });
  }
}
