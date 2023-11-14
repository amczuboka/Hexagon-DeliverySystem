import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeliveryQuotationComponent } from './request-delivery-quotation.component';

describe('RequestDeliveryQuotationComponent', () => {
  let component: RequestDeliveryQuotationComponent;
  let fixture: ComponentFixture<RequestDeliveryQuotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDeliveryQuotationComponent]
    });
    fixture = TestBed.createComponent(RequestDeliveryQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
