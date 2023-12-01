import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestDeliveryQuotationComponent } from 'src/app/pages/request-delivery-quotation/request-delivery-quotation.component';


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  newDeliveryItem!: FormGroup<any>;
  form: any;

  constructor(public dialogRef: MatDialogRef<RequestDeliveryQuotationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private form_builder: FormBuilder
  ){}


  ngOnInit(): void {
    this.newDeliveryItem = this.form_builder.group({
      Name: ['', [Validators.required]],
      Weight: ['', [Validators.required]],
      Size: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      itemPrice: [0]
    });
    

  }

  saveItem(){
    const { valid, value } = this.newDeliveryItem;
    if (valid) {
      this.dialogRef.close(value); // Pass the new item data when closing the dialog
    }
  }

}
