import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Delivery, DeliveryStatus } from 'src/app/modules/delivery.models';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-confirmation-dialog',
  templateUrl: './payment-confirmation-dialog.component.html',
  styleUrls: ['./payment-confirmation-dialog.component.scss'],
})
export class PaymentConfirmationDialogComponent {
  id$: any;
  delivery!: Delivery;

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PaymentConfirmationDialogComponent>,
    public deliveryService: DeliveryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.delivery = data;
  }

  close() {
    this.router.navigate(['/my-deliveries']);
    this.dialogRef.close();
  }
}
