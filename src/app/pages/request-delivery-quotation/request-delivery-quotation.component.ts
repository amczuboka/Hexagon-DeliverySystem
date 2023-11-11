import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-delivery-quotation',
  templateUrl: './request-delivery-quotation.component.html',
  styleUrls: ['./request-delivery-quotation.component.scss']
})
export class RequestDeliveryQuotationComponent {
  deliverydetailsForm!: FormGroup<any>;

}
