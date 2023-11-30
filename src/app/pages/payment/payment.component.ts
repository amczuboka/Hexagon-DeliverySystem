import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {PaymentConfirmationDialogComponent  } from 'src/app/components/payment-confirmation-dialog/payment-confirmation-dialog.component';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Delivery, DeliveryStatus } from 'src/app/modules/delivery.models';
import { ActivatedRoute } from '@angular/router';



export function canadianPostalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null; // No validation error if the input is empty
    }

    // Use a regular expression to match the Canadian postal code pattern
    const pattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    const isPostalCodeValid = pattern.test(value);

    return isPostalCodeValid ? null : { invalidCanadianPostalCode: true };
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null; // No validation error if the input is empty
    }

    // Use a regular expression to match the phone number pattern
    const pattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const isPhoneNumberValid = pattern.test(value);

    return isPhoneNumberValid ? null : { invalidPhoneNumber: true };
  };
}

export function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value) {
      return null; // No validation error if the input is empty
    }

    const isAlphabetic = /^[a-zA-Z]+$/.test(value);

    return isAlphabetic ? null : { nonAlphabetic: true };
  };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent {
  delivery!: Delivery;
  paymentForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;
  preselectedValue = "Canada"
  subTotalValue$: any;
  taxesValue$: any;
  totalValue$: any;

   // Define the countries array as a property of your component
   countries = [
    { code: 'CA', name: 'Canada' },
    // Add more countries as needed
  ];

   // Define the countries array as a property of your component
   provinces = [
    { code: 'Qc', name: 'Quebec' },
    { code: 'On', name: 'Ontario' },
    { code: 'Al', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'Ma', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'PEI', name: 'Prince Edward Island' },
    { code: 'Sk', name: 'Saskatchewan' },
  ];
 

  

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    public dialog: MatDialog,
    public deliveryService: DeliveryService,
    private Acrouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      //Email: ['', [Validators.required, Validators.email]],
      CardNumber: ['', [Validators.required, Validators.minLength(16), Validators.pattern(/^[0-9]*$/)]],
      ExpiryDate: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/) ]],
      CVV: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]{1,3}$/) ]],
      Name: ['', [Validators.required, Validators.minLength(1)]],
      First: ['', [Validators.required, Validators.minLength(1)]],
      Last: ['', [Validators.required, Validators.minLength(1)]],
      Street: ['', [Validators.required, Validators.minLength(1)]],
      Apt: ['', [Validators.minLength(1)]],
      City: ['', [Validators.required, Validators.minLength(1)]],
      Province: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Phone: ['', [Validators.required, phoneNumberValidator()]],
      Postal: ['', [Validators.required, canadianPostalCodeValidator()]],
    });

      this.Acrouter.queryParams.subscribe((params) => {
        const deliveryProps = JSON.parse(params['delivery']);
        this.delivery = new Delivery(deliveryProps);
      });  
    this.calculateValues();
  }

  calculateValues(): void {
    this.subTotalValue$ = this.delivery.Total;
    this.taxesValue$ = this.calculateTaxes(this.subTotalValue$);
    this.totalValue$ = this.calculateTotal(this.subTotalValue$, this.taxesValue$);
    console.log(this.taxesValue$ + this.totalValue$)
  }

  calculateTaxes(subTotalValue: any): any {
    const taxAmount = subTotalValue * (0.14975);
  
    // Round off the total amount to two decimal places
    const taxes = roundToTwoDecimalPlaces(taxAmount);
  
    return taxes;
  }

  calculateTotal(subTotalValue: any, taxesValue: any): any {
    const total = subTotalValue + taxesValue;

    return total;
  }

  placeOrder(){
    const {valid} = this.paymentForm;
    if (!valid){
      this.paymentForm.markAllAsTouched();
    }
    else{
      console.log(this.delivery.Id);
      this.deliveryService.updateDelivery(this.delivery.Id, {
        Status: DeliveryStatus.Pending,
      });
      this.storageService.sendNotification('Delivery status changed');

      this.openPaymentSummaryDialog();
    }
  }

  openPaymentSummaryDialog(): void {
    let dialogRef = this.dialog.open(PaymentConfirmationDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
function roundToTwoDecimalPlaces(value: any) {
  return Number(value.toFixed(2));
}

