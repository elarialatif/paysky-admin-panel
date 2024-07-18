import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterMessage } from '../../../core/services/toater.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  message: ToasterMessage | null = null;
  private subscription!: Subscription;

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.subscription = this.toasterService.toasterState.subscribe((message) => {
      this.message = message;
      setTimeout(() => this.message = null, 3000); // Clear message after 3 seconds
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
