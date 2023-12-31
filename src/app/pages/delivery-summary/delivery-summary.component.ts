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
import { UserService } from 'src/app/services/user.service';
import { ChangeDeliveryStatusDialogComponent } from 'src/app/components/change-delivery-status-dialog/change-delivery-status-dialog.component';

@Component({
  selector: 'app-delivery-summary',
  templateUrl: './delivery-summary.component.html',
  styleUrls: ['./delivery-summary.component.scss'],
})
export class DeliverySummaryComponent {
  delivery!: Delivery;
  authority: string = 'user';
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
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.Acrouter.queryParams.subscribe((params) => {
      const deliveryProps = JSON.parse(params['delivery']);
      this.delivery = new Delivery(deliveryProps);
    });

    this.myUser = this.authService.getUser();
    if (this.myUser) {
      this.authority = this.myUser.photoURL;
    }
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
        this.userService
          .getUser(this.myUser.uid)
          .then((user) => {
            review = this.setReviewUserAndDeliveryData(review, user);
          })
          .then(() => {
            this.reviewService.editReview(review).then(() => {
              this.storageService.sendNotification('Review edited');
              this.deliveryService
                .getDeliveryById(this.delivery.Id)
                .then((delivery) => {
                  if (delivery) {
                    this.delivery = delivery;
                  }
                });
            });
          });
      }
    });
  }

  deleteReview() {
    const dialogRef = this.dialog.open(DeleteReviewDialogComponent);

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.reviewService.deleteSpecificReview(this.delivery.Id).then(() => {
          this.storageService.sendNotification('Review deleted');
          this.deliveryService
            .getDeliveryById(this.delivery.Id)
            .then((delivery) => {
              if (delivery) {
                this.delivery = delivery;
              }
            });
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
        this.userService
          .getUser(this.myUser.uid)
          .then((user) => {
            review = this.setReviewUserAndDeliveryData(review, user);
          })
          .then(() => {
            this.reviewService.addReview(review).then(() => {
              this.storageService.sendNotification('Review added');
              this.deliveryService
                .getDeliveryById(this.delivery.Id)
                .then((delivery) => {
                  if (delivery) {
                    this.delivery = delivery;
                  }
                });
            });
          });
      }
    });
  }

  changeTrackingStatus() {
    if (this.delivery) {
      const dialogRef = this.dialog.open(ChangeDeliveryStatusDialogComponent, {
        data: this.delivery.Status as DeliveryStatus,
      });

      dialogRef.afterClosed().subscribe((status) => {
        if (status != null) {
          this.deliveryService
            .updateDelivery(this.delivery.Id, {
              Status: status,
            })
            .then(() => {
              this.storageService.sendNotification('Delivery status changed');
              this.deliveryService
                .getDeliveryById(this.delivery.Id)
                .then((delivery) => {
                  if (delivery) {
                    this.delivery = delivery;
                  }
                });
            });
        }
      });
    }
  }

  private setReviewUserAndDeliveryData(review: Review, user: any): Review {
    review.username = user?.FirstName + ' ' + user?.LastName;
    review.id = this.delivery.Id;
    review.date = new Date().toISOString();
    review.fromLocation = this.delivery.DepartLocation;
    review.toLocation = this.delivery.ArriveLocation;
    review.itemNames = this.delivery.items.map((item) => item.Name);
    return review;
  }
}
