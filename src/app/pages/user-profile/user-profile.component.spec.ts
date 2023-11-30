import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const authServiceMock = {
    userData: {
      uid: 'testUid',
    },
    getUser: jasmine.createSpy('getUser').and.returnValue(
      of({
        uid: 'testUid',
        email: '',
        FirstName: '',
        LastName: '',
      })
    ),
  };

  const userServiceMock = {
    getUser: jasmine.createSpy('getUser').and.returnValue(
      Promise.resolve({
        uid: 'testUid',
        email: '',
        FirstName: 'Test',
        LastName: '',
      })
    ),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [UserProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
