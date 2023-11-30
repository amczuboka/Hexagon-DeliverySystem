import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddroomComponent } from './addroom.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { AppModule } from 'src/app/app.module';
import { StorageService } from 'src/app/services/storage.service';

describe('AddroomComponent', () => {
  let component: AddroomComponent;
  let fixture: ComponentFixture<AddroomComponent>;
  const mockStorageService = {
    sendNotification: jasmine.createSpy('sendNotification'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddroomComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, AppModule],
      providers: [
        FormBuilder,
        AuthService,
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddroomComponent);
    component = fixture.componentInstance;
    component.roomForm = new FormBuilder().group({
      roomname: '',
      creater: '',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('should submit form', () => {
      const form = component.roomForm.value;
      component.onFormSubmit(form);
      // Add expectations or assertions related to form submission if needed
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
