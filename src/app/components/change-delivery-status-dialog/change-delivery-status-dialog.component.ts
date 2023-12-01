import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliveryStatus } from 'src/app/modules/delivery.models';
import { DeliverySummaryComponent } from 'src/app/pages/delivery-summary/delivery-summary.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-delivery-status-dialog',
  templateUrl: './change-delivery-status-dialog.component.html',
  styleUrls: ['./change-delivery-status-dialog.component.scss'],
})
export class ChangeDeliveryStatusDialogComponent implements OnInit {
  statusForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DeliverySummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public deliveryStatus: DeliveryStatus,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.statusForm = this.formBuilder.group({
      status: [this.deliveryStatus],
    });
  }

  changeStatus() {
    //close the dialog and return the status
    this.dialogRef.close(this.statusForm.value.status);
  }

  cancelChange() {
    //close the dialog and return null
    this.dialogRef.close(null);
  }
}
