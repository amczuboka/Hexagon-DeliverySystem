import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ChatroomComponent } from './chatroom.component';
import { PageInfo } from 'src/app/modules/chatbox.models';
import { DatePipe } from '@angular/common';
import { getDatabase, set } from 'firebase/database';

describe('ChatroomComponent', () => {
  let component: ChatroomComponent;
  let fixture: ComponentFixture<ChatroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ChatroomComponent],
    });
    fixture = TestBed.createComponent(ChatroomComponent);
    component = fixture.componentInstance;
    component.dataFromParent = { pageNumber: 1, roomName: '' };
    component.PersonOnPage = {
      FirstName: '',
      LastName: '',
      ID: '',
      Authority: '',
      Email: '',
      uid: '',
      email: '',
      photoURL: '',
      emailVerified: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should initialize chatForm in ngOnInit', () => {
    component.ngOnInit();
    expect(component.chatForm).toBeDefined();
  });

  it('should call onFormSubmit', () => {
    spyOn(component, 'onFormSubmit');
    component.onFormSubmit({ message: 'Test message' });
    expect(component.onFormSubmit).toHaveBeenCalledWith({ message: 'Test message' });
  });

  it('should call exitChat', () => {
    spyOn(component, 'exitChat');
    component.exitChat();
    expect(component.exitChat).toHaveBeenCalled();
  });

  it('should emit data from child on exitChat', () => {
    const pageInfo: PageInfo = {
      pageNumber: 1,
      roomName: '',
    };
    spyOn(component.dataFromChild, 'emit');

    component.exitChat();

    expect(component.dataFromChild.emit).toHaveBeenCalledWith(pageInfo);
  });

});
