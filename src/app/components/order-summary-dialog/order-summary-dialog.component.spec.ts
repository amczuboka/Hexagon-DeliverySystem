import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryDialogComponent } from './order-summary-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('OrderSummaryDialogComponent', () => {
  let component: OrderSummaryDialogComponent;
  let fixture: ComponentFixture<OrderSummaryDialogComponent>;
  const matDialogRefMock = {
    close: jasmine.createSpy('close'),
  };
  const matDialogDataMock = {
    order: {
      id: 'testId',
      title: 'Test',
      stars: 5,
      description: 'Test',
      date: '2022-01-01',
      fromLocation: 'Location A',
      toLocation: 'Location B',
      username: 'John Doe',
      itemNames: ['Item 1', 'Item 2'],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [OrderSummaryDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataMock },
      ],
    });
    fixture = TestBed.createComponent(OrderSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
