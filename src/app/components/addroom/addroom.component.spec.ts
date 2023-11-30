import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroomComponent } from './addroom.component';

import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import {AppModule} from 'src/app/app.module';

describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [AddroomComponent],
      providers: [FormBuilder, MatSnackBar, AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onFormSubmit', () => {
    it('should submit form', () => {
      const form = component.roomForm.value;
      component.onFormSubmit(form);
    });

    it('should check if form is valid', () => {
      component.roomForm.setValue({
        roomname: 'Test Room',
        creater: 'Test User',
      }); 
      expect(component.roomForm.valid).toBeTruthy();
    });
  });

  describe('exitPage', () => {
    it('should emit data', () => {
      const pageInfo = {
        pageNumber: 1,
        roomName: '',
      };
      spyOn(component.dataFromChild, 'emit');
      component.exitPage();
      expect(component.dataFromChild.emit).toHaveBeenCalledWith(pageInfo);
    });
  });
});
