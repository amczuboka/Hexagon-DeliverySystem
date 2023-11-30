import { TestBed } from '@angular/core/testing';

import { CalculateTotalDeliveryService } from './calculate-total-delivery.service';

describe('CalculateTotalDeliveryService', () => {
  let service: CalculateTotalDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateTotalDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
