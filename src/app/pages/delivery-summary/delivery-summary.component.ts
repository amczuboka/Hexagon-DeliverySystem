import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Database,
  ref,
  child,
  remove,
  onValue,
  update,
} from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import {
  Storage,
  ref as ref_storage,
  deleteObject,
} from '@angular/fire/storage';
import { StorageService } from 'src/app/services/storage.service';
import {
  Delivery,
  DeliveryStatus,
  Item,
  Review,
} from 'src/app/modules/delivery.models';
import { ReviewService } from 'src/app/services/review.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewDialogComponent } from 'src/app/components/review-dialog/review-dialog.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.scss'],
})
export class DeliverySummaryComponent {
  // status: string = DeliveryStatus.EnRoute.toString();
  delivery!: Delivery;
  authority!: string; // Don't thik it is needed
  myUser!: any;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public database: Database,
    public storage: Storage,
    private storageService: StorageService,
    private reviewService: ReviewService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.Acrouter.queryParams.subscribe((params) => {
      const deliveryProps = JSON.parse(params['delivery']);
      this.delivery = new Delivery(deliveryProps);
    });

    this.myUser = this.authService.getUser();
  }

  placeOrder() {
    // redirect to the payment page and pass the delivery object
    this.router.navigate(['/payment'], {
      queryParams: { delivery: JSON.stringify(this.delivery) },
    });
  }

  editReview() {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: this.delivery.Review as Review,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        from(this.reviewService.editReview(result)).subscribe(() => {
          console.log('Review edited');
          this.storageService.sendNotification('Review edited');
        });
      }
    });
  }

  deleteReview() {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: this.delivery.Review as Review,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        from(this.reviewService.editReview(result)).subscribe(() => {
          console.log('Review deleted');
          this.storageService.sendNotification('Review deleted');
        });
      }
    });
  }

  addReview() {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      data: {} as Review,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.id = this.delivery.Id;
        from(this.reviewService.addReview(result)).subscribe(() => {
          console.log('Review added');
          this.storageService.sendNotification('Review added');
        });
      }
    });
  }
}
