import { TestBed } from '@angular/core/testing';

import { DistanceCalculationService } from './distance-calculation.service';

describe('DistanceCalculationService', () => {
  let service: DistanceCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistanceCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
