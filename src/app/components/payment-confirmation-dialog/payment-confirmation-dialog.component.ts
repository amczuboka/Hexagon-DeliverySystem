import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-confirmation-dialog',
  templateUrl: './payment-confirmation-dialog.component.html',
  styleUrls: ['./payment-confirmation-dialog.component.scss']
})
export class PaymentConfirmationDialogComponent  {
  constructor(private router: Router, private dialogRef: MatDialogRef<PaymentConfirmationDialogComponent>) { }

close(){
  this.router.navigate(['/']);
  this.dialogRef.close();
}

}
