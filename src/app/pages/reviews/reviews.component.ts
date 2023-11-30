import { Component } from '@angular/core';
import { Review } from 'src/app/modules/delivery.models';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  constructor(private reviewService: ReviewService) {
    this.reviewService.getAllReviews().then((reviews) => {
      this.cards = reviews;
    });
  }

  cards: Review[] = [];

}
