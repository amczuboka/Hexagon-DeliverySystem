import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PaymentComponent, alphabeticValidator, canadianPostalCodeValidator, phoneNumberValidator} from './payment.component';
import { AppModule } from 'src/app/app.module';
import { of, Subject } from 'rxjs';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let formBuilder: FormBuilder;
  let dialog: MatDialog;
  let afterClosedSubject: Subject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [PaymentComponent],
      providers: [
        FormBuilder,
        { provide: MatDialog},
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ delivery: '{"Id":1,"Total":50}' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    dialog = TestBed.inject(MatDialog);
    afterClosedSubject = new Subject<any>();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open payment summary dialog on calling openPaymentSummaryDialog', fakeAsync(() => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => afterClosedSubject.asObservable(),
    } as any);

    component.openPaymentSummaryDialog();

    afterClosedSubject.complete();

    tick(20000);
    
    expect(dialogSpy).toHaveBeenCalled();
  }));

  it('should have proper validators', () => {
    const control = formBuilder.control('', [alphabeticValidator()]);
    control.setValue('Test');

    expect(control.valid).toBeTruthy();

    control.setValue('123');
    expect(control.hasError('nonAlphabetic')).toBeTruthy();
  });

  it('should have proper phoneNumberValidator', () => {
    const control = formBuilder.control('', [phoneNumberValidator()]);
    control.setValue('1234567890');

    expect(control.valid).toBeTruthy();

    control.setValue('notaphonenumber');
    expect(control.hasError('invalidPhoneNumber')).toBeTruthy();
  });

  it('should have proper canadianPostalCodeValidator', () => {
    const control = formBuilder.control('', [canadianPostalCodeValidator()]);
    control.setValue('H3Z 2Y7');

    expect(control.valid).toBeTruthy();

    control.setValue('notacanadianpostalcode');
    expect(control.hasError('invalidCanadianPostalCode')).toBeTruthy();
  });

  it('should round a number to two decimal places', () => {
    const value = 12.3456789;
    const result = component.roundToTwoDecimalPlaces(value);

    //Needs to be a number
    expect(typeof result).toBe('number');

    //what it expect the value to be
    expect(result).toBeCloseTo(12.35, 2);
  });

  it('should handle negative numbers correctly', () => {
    const value = -5.6789;
    const result = component.roundToTwoDecimalPlaces(value);

    //Needs to be a number
    expect(typeof result).toBe('number');

    //What the value needs to be
    expect(result).toBeCloseTo(-5.68, 2);
  });

  it('should handle integers correctly', () => {
    const value = 42;
    const result = component.roundToTwoDecimalPlaces(value);

    // Needs to be a number
    expect(typeof result).toBe('number');

    // Waht the value should be
    expect(result).toBeCloseTo(42, 2);
  });


  it('should calculate total with rounded values', () => {
    const subTotalValue = 50.25;
    const taxesValue = 7.4875;

    const result = component.calculateTotal(subTotalValue, taxesValue);

    //Needs to be a number
    expect(typeof result).toBe('number');


    //what it expect values to be
    expect(result).toBeCloseTo(57.74, 2);
  });


  it('should calculate taxes correctly', () => {
    // data
    const subTotalValue: number = 50.25;

    // call function
    const result = component.calculateTaxes(subTotalValue);

    // What it expects
    expect(result).toBeCloseTo(7.52, 2);
  });

});

