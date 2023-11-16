import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-summary-dialog',
  templateUrl: './order-summary-dialog.component.html',
  styleUrls: ['./order-summary-dialog.component.scss']
})
export class OrderSummaryDialogComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<OrderSummaryDialogComponent>) { }

  saveQuotation(){
    //save quotation
  }

  proceedToPayment(){
    this.router.navigate(['/payment']);
    this.dialogRef.close();
  }

}
