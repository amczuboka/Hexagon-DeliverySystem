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
  newDeliveryItem!: FormGroup<any>;
  //matcher!: ErrorStateMatcher;
  closeResult!: string;
  content: any;
  itemDescription: any;
  test: boolean = false;

  


  constructor(
    private form_builder: FormBuilder,
    private nodalService: NgbModal
  ){}

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
      //Add Item Info
      newItemDescription: ['', [Validators.required]]

    })

    this.newDeliveryItem = this.form_builder.group({
      itemDescription: ['', [Validators.required]],
    
    })
  }

  

  //Function for "add new item" pop-up form
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

   //Functions for "finish" pop-up form
   orderSummary(orderSummaryContent: any) {
    this.nodalService.open(orderSummaryContent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
 

}
