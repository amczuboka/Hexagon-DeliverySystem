import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

  itemSizes = [
    { id: 1, value: 'Option 1'},
    { id: 2, value: 'Option 2'},
    { id: 3, value: 'Option 3'},
    { id: 4, value: 'Option 4'},
  ]

  itemWeights = [
    { id: 1, value: 'Option 1'},
    { id: 2, value: 'Option 2'},
    { id: 3, value: 'Option 3'},
    { id: 4, value: 'Option 4'},
  ]

  ngOnInit(): void {
    this.newDeliveryItem = this.form_builder.group({
      itemDescription: ['', [Validators.required]],
      itemWeight: ['', [Validators.required]],
      itemSize: ['', [Validators.required]]
    });
    

  }

  saveItem(){
    const {value, valid} = this.newDeliveryItem;
    if (valid){
      this.data.dialogRef.close();
    }
    //save item to delivery
  }

  /*cancel(){
    this.data.dialogRef.close();
    //save item to delivery
  }*/


}
