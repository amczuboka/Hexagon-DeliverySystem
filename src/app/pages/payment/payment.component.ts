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
  paymentForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;
  preselectedValue = "Canada"

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
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
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
  
  }
  
  async onSubmit() {
    // stop the process here if form is invalid
    if (this.paymentForm.invalid) {
      this.storageService.sendNotification(
        'make sure to answer all required fields'
      );

      return;
    }

    window.open('', '_self');
  }



}
