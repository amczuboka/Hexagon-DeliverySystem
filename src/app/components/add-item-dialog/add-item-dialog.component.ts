import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestDeliveryQuotationComponent } from 'src/app/pages/request-delivery-quotation/request-delivery-quotation.component';


@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  newDeliveryItem!: FormGroup<any>;
  form_builder: any;

  constructor(public dialogRef: MatDialogRef<RequestDeliveryQuotationComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){}


  ngOnInit(): void {
    this.newDeliveryItem = this.form_builder.group({
      itemDescription: ['', [Validators.required]],

    })
    

  }

  saveItem(){
    this.data.dialogRef.close();
    //save item to delivery
  }


}
