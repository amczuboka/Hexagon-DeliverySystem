import { AfterViewChecked, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemDialogComponent } from 'src/app/components/add-item-dialog/add-item-dialog.component';
import { OrderSummaryDialogComponent } from 'src/app/components/order-summary-dialog/order-summary-dialog.component';
import { Item } from 'src/app/modules/delivery.models';
import { Delivery } from 'src/app/modules/delivery.models';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss'],
})
export class RequestDeliveryQuotationComponent implements AfterViewChecked {
  [x: string]: any;
  deliveryDetailsForm!: FormGroup<any>;
  newDeliveryItem!: FormGroup<any>;
  closeResult!: string;
  content: any;
  itemDescription: any;
  test: boolean = false;
  authority!: string;
  myUser!: any;
  isChecked: boolean = true;
  deliveryItems: Item[] = [];
 

  //departLocation!: string;  //depart location info concatenated
  //arriveLocation!: string;  //arrive location info concatenated

  constructor(
    private form_builder: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private Acrouter: ActivatedRoute,
    private nodalService: NgbModal,
    
  ) {}

  //For user authentication
  ngAfterViewChecked() {
    this.myUser = this.authService.getUser();
    const type = this['Acrouter'].snapshot.params['type'];
    if (type != undefined) {
      this.authority = type;
    }
    if (this.myUser) {
      this.authority = this.myUser.photoURL;
    }
  }

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

      //Recurring
      recurrence: [''],
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
    
    let depart_address = this.deliveryDetailsForm.value.departAddress;
    let depart_city = this.deliveryDetailsForm.value.departCity;
    let depart_province = this.deliveryDetailsForm.value.departProvince;
    let depart_postalCode = this.deliveryDetailsForm.value.departPostalCode;
    let departLocation = depart_address + ", " + depart_city + ", " + depart_province + ", " + depart_postalCode;

    let arrive_address = this.deliveryDetailsForm.value.destinationAddress;
    let arrive_city = this.deliveryDetailsForm.value.destinationCity;
    let arrive_province = this.deliveryDetailsForm.value.destinationProvince;
    let arrive_postalCode = this.deliveryDetailsForm.value.destinationPostalCode;
    let arriveLocation = arrive_address + ", " + arrive_city + ", " + arrive_province + ", " + arrive_postalCode;
    
    console.log(departLocation);
    console.log(arriveLocation);
    
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
