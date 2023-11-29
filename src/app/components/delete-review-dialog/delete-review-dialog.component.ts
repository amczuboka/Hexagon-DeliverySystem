import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliverySummaryComponent } from 'src/app/pages/delivery-summary/delivery-summary.component';

@Component({
  selector: 'app-delete-review-dialog',
  templateUrl: './delete-review-dialog.component.html',
  styleUrls: ['./delete-review-dialog.component.scss'],
})
export class DeleteReviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeliverySummaryComponent>
  ) {}

  confirmDelete() {
    //close the dialog and return true
    this.dialogRef.close(true);
  }

  cancelDelete() {
    //close the dialog and return false
    this.dialogRef.close(false);
  }
}
