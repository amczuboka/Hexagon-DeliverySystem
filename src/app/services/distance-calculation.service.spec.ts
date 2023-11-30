import { TestBed } from '@angular/core/testing';

import { DistanceCalculationService } from './distance-calculation.service';
import { AppModule } from '../app.module';

describe('DistanceCalculationService', () => {
  let service: DistanceCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(DistanceCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
