import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemDialogComponent } from 'src/app/components/add-item-dialog/add-item-dialog.component';
import { OrderSummaryDialogComponent } from 'src/app/components/order-summary-dialog/order-summary-dialog.component';
import { Item } from 'src/app/modules/delivery.models';

@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss'],
})
export class RequestDeliveryQuotationComponent {
  deliveryDetailsForm!: FormGroup<any>;
  newDeliveryItem!: FormGroup<any>;
  //matcher!: ErrorStateMatcher;
  closeResult!: string;
  content: any;
  itemDescription: any;
  test: boolean = false;
  deliveryItems: Item[] = [];

  constructor(
    private form_builder: FormBuilder,
    private nodalService: NgbModal,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.deliveryDetailsForm = this.form_builder.group({
      //Depart Location Info
      departAddress: ['', [Validators.required]],
      departCity: ['', [Validators.required]],
      departProvince: ['', [Validators.required]],
      departPostalCode: ['', [Validators.required]],

      //Destination Location Info
      destinationAddress: ['', [Validators.required]],
      destinationCity: ['', [Validators.required]],
      destinationProvince: ['', [Validators.required]],
      destinationPostalCode: ['', [Validators.required]],
    });
  }

  //Function to open "add new item dialog"
  openAddItemDialog(): void {
    let dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((newItem) => {
      console.log('The dialog was closed');
      if (newItem) {
        // Handle the newly added item here
        console.log('New item added:', newItem);
        this.deliveryItems.push(newItem);
      }
    });
  }

  //Function to open "order summary dialog"
  openOrderDialog(): void {
    let dialogRef = this.dialog.open(OrderSummaryDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
