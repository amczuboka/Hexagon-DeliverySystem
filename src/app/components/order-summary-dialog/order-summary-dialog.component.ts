import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-summary-dialog',
  templateUrl: './order-summary-dialog.component.html',
  styleUrls: ['./order-summary-dialog.component.scss']
})
export class OrderSummaryDialogComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<OrderSummaryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  saveQuotation(){
    //save quotation
  }

  proceedToPayment(){
    this.router.navigate(['/payment']);
    this.dialogRef.close();
  }

}
