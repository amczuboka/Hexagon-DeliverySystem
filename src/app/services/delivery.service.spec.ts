import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';
import { AppModule } from '../app.module';

describe('DelivertService', () => {
  let service: DeliveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(DeliveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
