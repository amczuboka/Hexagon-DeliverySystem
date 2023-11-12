import { Component, Input } from '@angular/core';
import { Delivery, DeliveryStatus } from 'src/app/modules/delivery.models';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent {
  @Input() delivery!: Delivery;

  getProgressBarValue() {
    switch (this.delivery.Status.toString()) {
      case DeliveryStatus.Quotation:
        return 0;
      case DeliveryStatus.Pending:
        return 33;
      case DeliveryStatus.EnRoute:
        return 66;
      case DeliveryStatus.Delivered:
        return 100;
      default:
        return 0;
    }
  }
}
