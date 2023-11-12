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
} from 'src/app/modules/delivery.models';

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
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.Acrouter.queryParams.subscribe((params) => {
      const deliveryProps = JSON.parse(params['delivery']);
      this.delivery = new Delivery(deliveryProps);
    });

    this.myUser = this.authService.getUser();

    // if (this.myUser && this.delivery) {
    //   if (this.myUser.photoURL == 'Student') {
    //     this.authority = 'Student';
    //   } else if (this.myUser.photoURL == 'Employer') {
    //     this.authority = 'Employer';
    //     if (this.myUser.uid == this.delivery.get('EmployerID')) {
    //       this.isEmployerWhoPosted = true;
    //     }
    //   }
    //   const dbRef = ref(this.database);
    //   let id = this.myUser.uid;
    //   const starCountRef = child(dbRef, `students/${id}/Favorites`);
    //   onValue(starCountRef, (snapshot) => {
    //     const data = snapshot.val();
    //     const keys = Object.keys(data);
    //     if (keys.includes(this.delivery.get('ID') as any)) {
    //       this.favorited = true;
    //     } else if (!keys.includes(this.delivery.get('ID') as any)) {
    //       this.favorited = false;
    //     }
    //   });
    //   const studentRef = child(dbRef, `students/${id}`);
    //   onValue(studentRef, (snapshot) => {
    //     const data = snapshot.val();
    //     if (data.CV == '' || data.CV == null || data.CV == undefined) {
    //       this.canApply = false;
    //     }
    //   });
    //   const starCountRef1 = child(
    //     dbRef,
    //     `job-deliverys/${this.delivery.get('ID')}/Candidates`
    //   );
    //   onValue(starCountRef1, (snapshot) => {
    //     const data = snapshot.val();
    //     const keys = Object.keys(data);
    //     if (keys.includes(this.myUser.uid)) {
    //       this.Applied = true;
    //     }
    //   });
    //   console.log('Applied : ' + this.Applied);
    // }
  }

  editReview() {
    console.log('edit');
  }

  deleteReview() {
    // Add a confirm dialog
    console.log('delete');
  }

  addReview() {
    // Create a dialog to add a review
    console.log('add');
  }
}
