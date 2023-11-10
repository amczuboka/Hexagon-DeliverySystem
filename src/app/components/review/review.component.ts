import { Component, Input } from '@angular/core';
import { faStar as EmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar} from '@fortawesome/free-solid-svg-icons';
import { Review } from 'src/app/modules/delivery.models';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review!: Review;
  reviewStarEmpty = EmptyStar;
  reviewStarSolid = SolidStar;

  getStarArr(): boolean[] {
    let stars: boolean[] = Array(5).fill({});
    for(let i = 0; i < stars.length; i++) {
      stars[i] = i + 1 <= this.review.stars
    }
    return stars;
  }

}
