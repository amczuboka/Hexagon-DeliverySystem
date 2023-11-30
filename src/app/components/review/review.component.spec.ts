import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { AppModule } from 'src/app/app.module';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ReviewComponent],
    });
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    component.review = {
      id: 'testId',
      title: 'Test',
      stars: 5,
      description: 'Test',
      date: '2022-01-01',
      fromLocation: 'Location A',
      toLocation: 'Location B',
      username: 'John Doe',
      itemNames: ['Item 1', 'Item 2'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
