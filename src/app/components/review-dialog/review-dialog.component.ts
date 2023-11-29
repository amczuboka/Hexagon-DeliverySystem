import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeliverySummaryComponent } from 'src/app/pages/delivery-summary/delivery-summary.component';
import { faStar as EmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { Review } from 'src/app/modules/delivery.models';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {
  reviewForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  reviewStarEmpty = EmptyStar;
  reviewStarSolid = SolidStar;

  constructor(
    public dialogRef: MatDialogRef<DeliverySummaryComponent>,
    @Inject(MAT_DIALOG_DATA) public review: Review,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      stars: [
        this.review.stars || 1,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      title: [this.review.title, Validators.required],
      description: [this.review.description, Validators.required],
      date: [new Date()],
    });
  }

  saveReview() {
    if (this.reviewForm.valid) {
      this.review = this.reviewForm.value;
      this.dialogRef.close(this.review);
    }
  }

  cancel(){
    this.dialogRef.close();
  }

  setStarRating(rating: number) {
    this.reviewForm.controls['stars'].setValue(rating);
  }

  getStarArr(): boolean[] {
    let stars: boolean[] = Array(5).fill({});
    for (let i = 0; i < stars.length; i++) {
      stars[i] = i + 1 <= this.reviewForm.controls['stars'].value;
    }
    return stars;
  }
}
