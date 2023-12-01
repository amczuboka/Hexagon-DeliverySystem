import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-order-summary-dialog',
  templateUrl: './order-summary-dialog.component.html',
  styleUrls: ['./order-summary-dialog.component.scss'],
})
export class OrderSummaryDialogComponent {
  deliveryObj: any;
  
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<OrderSummaryDialogComponent>,
    private deliveryService: DeliveryService,
    private storageService: StorageService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.deliveryObj = data;

    }

  saveQuotation() {
    //save quotation
    this.deliveryService.addDelivery(this.deliveryObj);
    this.storageService.sendNotification('Delivery has been saved as quotation!');
  }

  proceedToPayment() {
    //redirect to payment page and pass the delivery object
    this.router.navigate(['/payment'], {
      queryParams: { delivery: JSON.stringify(this.deliveryObj) },
    });
    this.dialogRef.close();
  }
}
