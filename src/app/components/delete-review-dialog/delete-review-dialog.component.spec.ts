import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewDialogComponent } from './delete-review-dialog.component';
import { AppModule } from 'src/app/app.module';
import { MatDialogRef } from '@angular/material/dialog';

describe('DeleteReviewDialogComponent', () => {
  let component: DeleteReviewDialogComponent;
  let fixture: ComponentFixture<DeleteReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [DeleteReviewDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    });
    fixture = TestBed.createComponent(DeleteReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
