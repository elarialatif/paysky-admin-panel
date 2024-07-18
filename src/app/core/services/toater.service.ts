import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToasterMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasterSubject = new Subject<ToasterMessage>();
  toasterState = this.toasterSubject.asObservable();

  showMessage(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toasterSubject.next({ message, type });
  }
}
