import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCardComponent } from './delivery-card.component';

describe('DeliveryCardComponent', () => {
  let component: DeliveryCardComponent;
  let fixture: ComponentFixture<DeliveryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryCardComponent]
    });
    fixture = TestBed.createComponent(DeliveryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
