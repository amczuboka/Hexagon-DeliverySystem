import { CalculateTotalDeliveryService } from './../../services/calculate-total-delivery.service';
import { AfterViewChecked, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemDialogComponent } from 'src/app/components/add-item-dialog/add-item-dialog.component';
import { OrderSummaryDialogComponent } from 'src/app/components/order-summary-dialog/order-summary-dialog.component';
import { DeliveryFrequency, Item } from 'src/app/modules/delivery.models';
import { Delivery } from 'src/app/modules/delivery.models';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from '../../services/storage.service';

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
  deliveryObj!: Delivery;
  isLoading: boolean = false;

  //departLocation!: string;  //depart location info concatenated
  //arriveLocation!: string;  //arrive location info concatenated

  constructor(
    private form_builder: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private Acrouter: ActivatedRoute,
    private nodalService: NgbModal,
    private calculateTotalDeliveryService: CalculateTotalDeliveryService,
    private storageService: StorageService
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
      frequency: [DeliveryFrequency.Once],
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
    if (this.deliveryDetailsForm.valid && this.deliveryItems.length > 0) {
      this.isLoading = true;
      //makes sure the form is filled out and there is at least one item in the delivery
      //Obtaining values from form
      let depart_address = this.deliveryDetailsForm.value.departAddress;
      let depart_city = this.deliveryDetailsForm.value.departCity;
      let depart_province = this.deliveryDetailsForm.value.departProvince;
      let depart_postalCode = this.deliveryDetailsForm.value.departPostalCode;

      let arrive_address = this.deliveryDetailsForm.value.destinationAddress;
      let arrive_city = this.deliveryDetailsForm.value.destinationCity;
      let arrive_province = this.deliveryDetailsForm.value.destinationProvince;
      let arrive_postalCode =
        this.deliveryDetailsForm.value.destinationPostalCode;

      let DepartLocation =
        depart_address +
        ', ' +
        depart_city +
        ', ' +
        depart_province +
        ', ' +
        depart_postalCode;
      let ArriveLocation =
        arrive_address +
        ', ' +
        arrive_city +
        ', ' +
        arrive_province +
        ', ' +
        arrive_postalCode;
      let Frequency = this.deliveryDetailsForm.value.frequency;
      if (Frequency === '') {
        Frequency = DeliveryFrequency.Once; // Set default frequency here
      }

      this.deliveryObj = new Delivery({
        DepartLocation: DepartLocation,
        ArriveLocation: ArriveLocation,
        Frequency: Frequency,
        items: this.deliveryItems,
      });

      this.calculateTotalDeliveryService
        .calculateTotalDeliveryPrice(this.deliveryObj)
        .subscribe((delivery: Delivery) => {
          this.deliveryObj = delivery;
          this.isLoading = false;
          let dialogRef = this.dialog.open(OrderSummaryDialogComponent, {
            data: this.deliveryObj,
          }); //opening dialog and sending delivery object

          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
          });
        });
    } else {
      this.storageService.sendNotification('Please fill out the form and add at least one item to the delivery');
    }
  }
}
