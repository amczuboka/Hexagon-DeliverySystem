import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryItemComponent } from './delivery-item.component';
import { AppModule } from 'src/app/app.module';

describe('DeliveryItemComponent', () => {
  let component: DeliveryItemComponent;
  let fixture: ComponentFixture<DeliveryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [DeliveryItemComponent],
    });
    fixture = TestBed.createComponent(DeliveryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
