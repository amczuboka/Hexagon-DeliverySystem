import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmationDialogComponent } from './payment-confirmation-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('PaymentConfirmationDialogComponent', () => {
  let component: PaymentConfirmationDialogComponent;
  let fixture: ComponentFixture<PaymentConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [PaymentConfirmationDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ],
    });
    fixture = TestBed.createComponent(PaymentConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
