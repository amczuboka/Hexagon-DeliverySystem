import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeliveryStatusDialogComponent } from './change-delivery-status-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ChangeDeliveryStatusDialogComponent', () => {
  let component: ChangeDeliveryStatusDialogComponent;
  let fixture: ComponentFixture<ChangeDeliveryStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ChangeDeliveryStatusDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // if you're using MAT_DIALOG_DATA in your component
      ],
    });
    fixture = TestBed.createComponent(ChangeDeliveryStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
