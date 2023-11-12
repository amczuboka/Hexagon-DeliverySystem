//import { Component } from '@angular/core';
//import { FormGroup } from '@angular/forms';

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss']
})
export class RequestDeliveryQuotationComponent {
  deliveryDetailsForm!: FormGroup<any>;
  //matcher: ErrorStateMatcher | undefined;

  constructor(
    private form_builder: FormBuilder
  ){}

  ngOnInit(): void{
    this.deliveryDetailsForm = this.form_builder.group({
      departLocation: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    })
  }

}
