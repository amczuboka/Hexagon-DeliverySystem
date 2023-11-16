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

  constructor(public dialogRef: MatDialogRef<RequestDeliveryQuotationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private form_builder: FormBuilder
  ){}


  ngOnInit(): void {
    this.newDeliveryItem = this.form_builder.group({
      itemDescription: ['', [Validators.required]],
      itemWeight: ['', [Validators.required]],
      itemSize: ['', [Validators.required]],
      qty: ['', [Validators.required]]
    });
    

  }

  saveItem(){
    const {valid} = this.newDeliveryItem;
    if (valid){
      this.data.dialogRef.close();
    }
    //save item to delivery
  }


}
