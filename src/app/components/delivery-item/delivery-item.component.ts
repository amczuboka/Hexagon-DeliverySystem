import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrls: ['./delivery-item.component.scss']
})
export class DeliveryItemComponent {  
  @Input() deliveryItems: any; // Input binding to receive deliveryItems array

  deleteItem(item: any) {
    // Delete the item from the deliveryItems array
    this.deliveryItems.splice(this.deliveryItems.indexOf(item), 1);
    console.log('Item deleted:', item);
    console.log(this.deliveryItems);
  }
}
