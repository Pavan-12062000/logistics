import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<{ message: string, type: 'success' | 'error' | 'info' }>({ message: '', type: 'info' });
  
  notification$ = this.notificationSubject.asObservable();

  showNotification(message: string, type: 'success' | 'error' | 'info') {
    
    this.notificationSubject.next({ message, type });
  }
}
