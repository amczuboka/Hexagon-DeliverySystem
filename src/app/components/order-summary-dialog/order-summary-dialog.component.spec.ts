import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryDialogComponent } from './order-summary-dialog.component';

describe('OrderSummaryDialogComponent', () => {
  let component: OrderSummaryDialogComponent;
  let fixture: ComponentFixture<OrderSummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryDialogComponent]
    });
    fixture = TestBed.createComponent(OrderSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
