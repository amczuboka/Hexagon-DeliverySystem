import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeliveryQuotationComponent } from './request-delivery-quotation.component';
import { AppModule } from 'src/app/app.module';

describe('RequestDeliveryQuotationComponent', () => {
  let component: RequestDeliveryQuotationComponent;
  let fixture: ComponentFixture<RequestDeliveryQuotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [RequestDeliveryQuotationComponent],
    });
    fixture = TestBed.createComponent(RequestDeliveryQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
