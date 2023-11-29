import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DeliverySummaryComponent } from './delivery-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryService } from '../../services/delivery.service';
import { of, Subject } from 'rxjs';
import {
  DeliveryStatus,
  DeliveryFrequency,
} from '../../modules/delivery.models';
import { AppModule } from 'src/app/app.module';

describe('DeliverySummaryComponent', () => {
  let component: DeliverySummaryComponent;
  let fixture: ComponentFixture<DeliverySummaryComponent>;
  let dialog: MatDialog;
  let deliveryService: DeliveryService;
  let afterClosedSubject: Subject<any>;

  beforeEach(async () => {
    let deliveryServiceMock = {
      updateDelivery: () => of(null),
      getDeliveryById: () =>
        of({
          Id: 'testId',
          Status: DeliveryStatus.EnRoute,
          Userid: '',
          Review: {
            stars: 0,
            description: '',
            title: '',
            date: new Date(),
            id: 'testId',
          },
          Distance: 0,
          DepartLocation: '',
          ArriveLocation: '',
          orderDate: new Date(),
          EstimatedTime: new Date(),
          Recurring: false,
          Frequency: DeliveryFrequency.Once,
          items: [],
          Total: 0,
          calculateTotal: () => 0,
        }),
    };

    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [DeliverySummaryComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: { open: () => ({ afterClosed: () => of(null) }) },
        },
        { provide: DeliveryService, useValue: deliveryServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverySummaryComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    deliveryService = TestBed.inject(DeliveryService);
    afterClosedSubject = new Subject<any>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog and change tracking status', fakeAsync(() => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);
    const updateDeliverySpy = spyOn(
      deliveryService,
      'updateDelivery'
    ).and.returnValue(Promise.resolve());

    component.delivery = {
      Id: 'testId',
      Status: DeliveryStatus.EnRoute,
      Userid: '',
      Review: {
        stars: 0,
        description: '',
        title: '',
        date: new Date(),
        id: 'testId',
      },
      Distance: 0,
      DepartLocation: '',
      ArriveLocation: '',
      orderDate: new Date(),
      EstimatedTime: new Date(),
      Recurring: false,
      Frequency: DeliveryFrequency.Once,
      items: [],
      Total: 0,
      calculateTotal: () => 0,
    };

    component.changeTrackingStatus();

    afterClosedSubject.next(DeliveryStatus.EnRoute);
    afterClosedSubject.complete();

    tick(20000);

    expect(dialogSpy).toHaveBeenCalled();
    expect(updateDeliverySpy).toHaveBeenCalled();
  }));

  it('should open dialog and add review', fakeAsync(() => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);
    const updateDeliverySpy = spyOn(
      deliveryService,
      'updateDelivery'
    ).and.returnValue(Promise.resolve());

    component.delivery = {
      Id: 'testId',
      Status: DeliveryStatus.EnRoute,
      Userid: '',
      Review: {
        stars: 0,
        description: '',
        title: '',
        date: new Date(),
        id: 'testId',
      },
      Distance: 0,
      DepartLocation: '',
      ArriveLocation: '',
      orderDate: new Date(),
      EstimatedTime: new Date(),
      Recurring: false,
      Frequency: DeliveryFrequency.Once,
      items: [],
      Total: 0,
      calculateTotal: () => 0,
    };

    component.addReview();

    afterClosedSubject.next({
      stars: 0,
      description: '',
      title: '',
      date: new Date(),
      id: 'testId',
    });
    afterClosedSubject.complete();

    tick(20000);

    expect(dialogSpy).toHaveBeenCalled();
    expect(updateDeliverySpy).toHaveBeenCalled();
  }));

  it('should open dialog and delete review', fakeAsync(() => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);
    const updateDeliverySpy = spyOn(
      deliveryService,
      'updateDelivery'
    ).and.returnValue(Promise.resolve());

    component.delivery = {
      Id: 'testId',
      Status: DeliveryStatus.EnRoute,
      Userid: '',
      Review: {
        stars: 0,
        description: '',
        title: '',
        date: new Date(),
        id: 'testId',
      },
      Distance: 0,
      DepartLocation: '',
      ArriveLocation: '',
      orderDate: new Date(),
      EstimatedTime: new Date(),
      Recurring: false,
      Frequency: DeliveryFrequency.Once,
      items: [],
      Total: 0,
      calculateTotal: () => 0,
    };

    // Mock the deliveryService.getDeliveryById method
    spyOn(deliveryService, 'getDeliveryById').and.returnValue(
      Promise.resolve({
        Id: 'testId',
        Status: DeliveryStatus.EnRoute,
        Userid: '',
        Review: {
          stars: 0,
          description: '',
          title: '',
          date: new Date(),
          id: 'testId',
        },
        Distance: 0,
        DepartLocation: '',
        ArriveLocation: '',
        orderDate: new Date(),
        EstimatedTime: new Date(),
        Recurring: false,
        Frequency: DeliveryFrequency.Once,
        items: [],
        Total: 0,
        calculateTotal: () => 0,
      })
    );

    // Rest of your test code...

    component.deleteReview();

    afterClosedSubject.next(true);
    afterClosedSubject.complete();

    tick(20000);

    expect(dialogSpy).toHaveBeenCalled();
    expect(updateDeliverySpy).toHaveBeenCalled();
  }));

  it('should open dialog and edit review', fakeAsync(() => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);
    const updateDeliverySpy = spyOn(
      deliveryService,
      'updateDelivery'
    ).and.returnValue(Promise.resolve());

    component.delivery = {
      Id: 'testId',
      Status: DeliveryStatus.EnRoute,
      Userid: '',
      Review: {
        stars: 0,
        description: '',
        title: '',
        date: new Date(),
        id: 'testId',
      },
      Distance: 0,
      DepartLocation: '',
      ArriveLocation: '',
      orderDate: new Date(),
      EstimatedTime: new Date(),
      Recurring: false,
      Frequency: DeliveryFrequency.Once,
      items: [],
      Total: 0,
      calculateTotal: () => 0,
    };

    component.editReview();

    afterClosedSubject.next({
      stars: 0,
      description: '',
      title: '',
      date: new Date(),
      id: 'testId',
    });
    afterClosedSubject.complete();

    tick(20000);

    expect(dialogSpy).toHaveBeenCalled();
    expect(updateDeliverySpy).toHaveBeenCalled();
  }));
});
