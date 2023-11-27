import { AfterViewChecked, Component } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddItemDialogComponent } from 'src/app/components/add-item-dialog/add-item-dialog.component';
import { OrderSummaryDialogComponent } from 'src/app/components/order-summary-dialog/order-summary-dialog.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss']
})
export class RequestDeliveryQuotationComponent implements AfterViewChecked {
[x: string]: any;
  deliveryDetailsForm!: FormGroup<any>;
  newDeliveryItem!: FormGroup<any>;
  //matcher!: ErrorStateMatcher;
  closeResult!: string;
  content: any;
  itemDescription: any;
  test: boolean = false;
  authority!: string;
  myUser!: any; 

  constructor(
    private form_builder: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private Acrouter: ActivatedRoute
  ){}

  ngAfterViewChecked() {
    this.myUser = this.authService.getUser();
    const type = this['Acrouter'].snapshot.params['type'];
     if (type!= undefined) {
       this.authority = type;
     }
    if (this.myUser) {
      this.authority = this.myUser.photoURL;
    }
  }

  ngOnInit(): void{
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

    })

  }

  //Function to open "add new item dialog"
  openAddItemDialog(): void {
    let dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //Function to open "order summary dialog"
  openOrderDialog(): void {
    let dialogRef = this.dialog.open(OrderSummaryDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


 

}
