import { TestBed } from '@angular/core/testing';

import { CalculateTotalDeliveryService } from './calculate-total-delivery.service';
import { AppModule } from '../app.module';

describe('CalculateTotalDeliveryService', () => {
  let service: CalculateTotalDeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(CalculateTotalDeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
