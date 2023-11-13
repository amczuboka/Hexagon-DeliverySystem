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
      Apt: ['', [Validators.required, Validators.minLength(1)]],
      City: ['', [Validators.required, Validators.minLength(1)]],
      Province: ['', [Validators.required, Validators.minLength(1)]],
      Country: ['', [Validators.required, Validators.minLength(1)]],
      Phone: ['', [Validators.required, Validators.minLength(1)]],
      Postal: ['', [Validators.required, Validators.minLength(1)]],
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
