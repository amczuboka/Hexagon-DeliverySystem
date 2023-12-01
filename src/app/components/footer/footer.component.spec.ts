import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { AppModule } from 'src/app/app.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [AppModule],
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('receiveData', () => {
    beforeEach(() => {
      spyOnProperty(component.authService, 'isLoggedIn', 'get').and.returnValue(true);
    }); 

    it('should set pageNumber to 1', () => {
      const data = { pageNumber: 1, roomName: '' };
      component.receiveData(data);
      expect(component.CustumorServicePage.pageNumber).toEqual(1);
    });

    it('should set pageNumber to 2', () => {
      const data = { pageNumber: 2, roomName: '' };
      component.receiveData(data);
      expect(component.CustumorServicePage.pageNumber).toEqual(2);
    });

    it('should set pageNumber to 3 and roomName', () => {
      const data = { pageNumber: 3, roomName: 'testRoom' };
      component.receiveData(data);
      expect(component.CustumorServicePage.pageNumber).toEqual(3);
      expect(component.CustumorServicePage.roomName).toEqual('testRoom');
    });

    it('should display app-roomlist when pageNumber is 1', () => {
      const data = { pageNumber: 1, roomName: '' };
      component.receiveData(data);
      fixture.detectChanges();
      const roomlistElement =
        fixture.debugElement.nativeElement.querySelector('app-roomlist');
      expect(roomlistElement).toBeTruthy();
    });

    it('should display app-addroom when pageNumber is 2', () => {
      const data = { pageNumber: 2, roomName: '' };
      component.receiveData(data);
      fixture.detectChanges();
      const roomlistElement =
        fixture.debugElement.nativeElement.querySelector('app-addroom');
      expect(roomlistElement).toBeTruthy();
    });

    it('should display app-chatroom when pageNumber is 3', () => {
      const data = { pageNumber: 3, roomName: '' };
      component.receiveData(data);
      fixture.detectChanges();
      const roomlistElement =
        fixture.debugElement.nativeElement.querySelector('app-chatroom');
      expect(roomlistElement).toBeTruthy();
    });
  });
});
