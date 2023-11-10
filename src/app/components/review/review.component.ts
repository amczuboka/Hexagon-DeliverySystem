import { Component } from '@angular/core';
import { faStar as EmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as SolidStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  reviewStarEmpty = EmptyStar;
  reviewStarSolid = SolidStar;
}
