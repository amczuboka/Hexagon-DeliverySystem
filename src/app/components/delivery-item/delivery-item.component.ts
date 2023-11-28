import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent {  
  @Input() deliveryItems: any; // Input binding to receive deliveryItems array
}
