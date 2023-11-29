import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReviewDialogComponent } from './delete-review-dialog.component';

describe('DeleteReviewDialogComponent', () => {
  let component: DeleteReviewDialogComponent;
  let fixture: ComponentFixture<DeleteReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReviewDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
