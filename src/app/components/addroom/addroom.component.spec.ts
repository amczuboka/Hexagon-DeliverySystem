import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroomComponent } from './addroom.component';

describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddroomComponent]
    });
    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
