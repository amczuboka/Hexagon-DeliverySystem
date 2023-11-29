import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Delivery, DeliveryStatus } from 'src/app/modules/delivery.models';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-payment-confirmation-dialog',
  templateUrl: './payment-confirmation-dialog.component.html',
  styleUrls: ['./payment-confirmation-dialog.component.scss']
})
export class PaymentConfirmationDialogComponent  {
  id$: any
  delivery!: Delivery;

  constructor(private router: Router,
    private dialogRef: MatDialogRef<PaymentConfirmationDialogComponent>, 
    public deliveryService: DeliveryService,
    private Acrouter: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.Acrouter.queryParams.subscribe((params) => {
      const deliveryProps = JSON.parse(params['delivery']);
      this.delivery = new Delivery(deliveryProps);
    });  

    this.id$ = this.delivery.Id;
    console.log(this.id$)
  }

close(){
  this.router.navigate(['/my-deliveries']);
  this.dialogRef.close();
}

}
