import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeliveriesComponent } from './my-deliveries.component';
import { AppModule } from 'src/app/app.module';

describe('MyDeliveriesComponent', () => {
  let component: MyDeliveriesComponent;
  let fixture: ComponentFixture<MyDeliveriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [MyDeliveriesComponent],
    });
    fixture = TestBed.createComponent(MyDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
