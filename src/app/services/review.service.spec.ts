import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { AppModule } from '../app.module';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [ReviewService],
    });
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
