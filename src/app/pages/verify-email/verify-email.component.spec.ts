import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth.service';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authServiceMock = {
    userData: {
      email: 'test@example.com',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [VerifyEmailComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
