import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
}
