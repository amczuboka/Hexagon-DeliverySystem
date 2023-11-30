import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingComponent } from './tracking.component';
import { AppModule } from 'src/app/app.module';
import {
  DeliveryFrequency,
  DeliveryStatus,
} from 'src/app/modules/delivery.models';

describe('TrackingComponent', () => {
  let component: TrackingComponent;
  let fixture: ComponentFixture<TrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [TrackingComponent],
    });
    fixture = TestBed.createComponent(TrackingComponent);
    component = fixture.componentInstance;
    component.delivery = {
      Userid: '123',
      Review: {
        stars: 0,
        description: '',
        title: '',
        date: '',
        fromLocation: '',
        toLocation: '',
        username: '',
        itemNames: [],
        id: '',
      },
      Distance: 10,
      DepartLocation: 'Location A',
      ArriveLocation: 'Location B',
      EstimatedTime: '2022-01-01',
      OrderDate: '2022-01-01',
      Id: '123',
      Recurring: false,
      Frequency: DeliveryFrequency.Once,
      Status: DeliveryStatus.Pending,
      items: [],
      Total: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
