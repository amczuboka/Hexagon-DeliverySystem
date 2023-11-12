import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  FormGroupDirective, 
  NgForm, 
  Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss']
})
export class RequestDeliveryQuotationComponent{
  deliveryDetailsForm!: FormGroup<any>;
  //matcher!: ErrorStateMatcher;
  closeResult!: string;
content: any;

  constructor(
    private form_builder: FormBuilder,
    private nodalService: NgbModal
  ){}

  ngOnInit(): void{
    this.deliveryDetailsForm = this.form_builder.group({
      departLocation: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    })
  }

  //Functions for pop-up form
  open(content: any) {
    this.nodalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //Function for getPrice()
  /*public showMyMessage = false

  getPrice() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 1000)
  }*/

   //Functions for pop-up form
   orderSummary(orderSummaryContent: any) {
    this.nodalService.open(orderSummaryContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
 

}
