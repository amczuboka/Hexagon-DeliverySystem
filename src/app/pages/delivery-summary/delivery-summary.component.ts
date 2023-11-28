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
import { DeleteReviewDialogComponent } from 'src/app/components/delete-review-dialog/delete-review-dialog.component';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ChangeDeliveryStatusDialogComponent } from 'src/app/components/change-delivery-status-dialog/change-delivery-status-dialog.component';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.scss'],
})
export class DeliverySummaryComponent {
  delivery!: Delivery;
  authority!: string;
  myUser!: any;

  constructor(
    private Acrouter: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public database: Database,
    public storage: Storage,
    private storageService: StorageService,
    private reviewService: ReviewService,
    private deliveryService: DeliveryService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.Acrouter.queryParams.subscribe((params) => {
      const deliveryProps = JSON.parse(params['delivery']);
      this.delivery = new Delivery(deliveryProps);
    });

    this.myUser = this.authService.getUser();
    this.delivery = this.myUser.photoURL;
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

    dialogRef.afterClosed().subscribe((review) => {
      if (review) {
        from(this.reviewService.editReview(review)).subscribe(() => {
          console.log('Review edited');
          this.storageService.sendNotification('Review edited');
        });
      }
    });
  }

  deleteReview() {
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent);

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        from(
          this.reviewService.deleteSpecificReview(this.delivery.Review.id)
        ).subscribe(() => {
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

    dialogRef.afterClosed().subscribe((review) => {
      if (review) {
        review.id = this.delivery.Id;
        from(this.reviewService.addReview(review)).subscribe(() => {
          console.log('Review added');
          this.storageService.sendNotification('Review added');
        });
      }
    });
  }

  changeTrackingStatus() {
    const dialogRef = this.dialog.open(ChangeDeliveryStatusDialogComponent, {
      data: this.delivery.Status as DeliveryStatus,
    });

    dialogRef.afterClosed().subscribe((status) => {
      if (status) {
        from(
          this.deliveryService.updateDelivery(this.delivery.Id, {
            Status: status,
          })
        ).subscribe(() => {
          console.log('Delivery status changed');
          this.storageService.sendNotification('Delivery status changed');
        });
      }
    });
  }
}
