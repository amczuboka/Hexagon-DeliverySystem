import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryItemComponent } from './delivery-item.component';

describe('DeliveryItemComponent', () => {
  let component: DeliveryItemComponent;
  let fixture: ComponentFixture<DeliveryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryItemComponent]
    });
    fixture = TestBed.createComponent(DeliveryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
