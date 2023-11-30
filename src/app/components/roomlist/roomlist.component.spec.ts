import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlistComponent } from './roomlist.component';
import { AppModule } from 'src/app/app.module';


describe('RoomlistComponent', () => {
  let component: RoomlistComponent;
  let fixture: ComponentFixture<RoomlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomlistComponent],
      imports: [AppModule],
      // provide the component-under-test and dependent service
    });
    fixture = TestBed.createComponent(RoomlistComponent);
    component = fixture.componentInstance;
 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test GotoPage function', () => {
    const pagenumber = 1;
    const roomname = 'testRoom';
    spyOn(component.dataFromChild, 'emit');
    component.GotoPage(pagenumber, roomname);
    expect(component.dataFromChild.emit).toHaveBeenCalledWith({
      pageNumber: pagenumber,
      roomName: roomname,
    });
  });


  it('should test deleteRoom function', () => {
    const roomname = 'testRoom';
    spyOn(component, 'deleteRoom');
    component.deleteRoom(roomname);
    expect(component.deleteRoom).toHaveBeenCalledWith(roomname);
  });
});
