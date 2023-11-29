import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeliveryStatusDialogComponent } from './change-delivery-status-dialog.component';

describe('ChangeDeliveryStatusDialogComponent', () => {
  let component: ChangeDeliveryStatusDialogComponent;
  let fixture: ComponentFixture<ChangeDeliveryStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeDeliveryStatusDialogComponent]
    });
    fixture = TestBed.createComponent(ChangeDeliveryStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
