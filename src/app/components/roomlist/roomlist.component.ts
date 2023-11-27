import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';
import {
  getDatabase,
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  Database,
  get,
  remove,
} from 'firebase/database';
import { User, UserDTO } from 'src/app/modules/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { PageInfo } from 'src/app/modules/chatbox.models';

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss'],
})
export class RoomlistComponent {
  @Output() dataFromChild = new EventEmitter<any>();

  email: string;
  displayedColumns: string[] = ['roomname'];
  rooms: any[] = [];
  isLoadingResults = true;
  PersonOnPage!: UserDTO;
  seeAddButton = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe,
    private authService: AuthService,
    private chatroomService: ChatroomService
  ) {
    const user = this.authService.getUser();
    this.email = user.email;

    const db = getDatabase();
    onValue(ref(db, 'rooms/'), async (snapshot) => {
      this.rooms = [];
      this.rooms = snapshotToArray(snapshot);
      console.log(this.rooms);
      this.isLoadingResults = false;
      this.PersonOnPage = await this.chatroomService.getPersonOnPage(db, user);
      if (this.PersonOnPage.Authority == 'Individual') {
        this.rooms = this.rooms.filter(
          (room) => room.creater === this.PersonOnPage.ID
        );
      }
      if (this.PersonOnPage.Authority == 'Staff') {
        this.seeAddButton = false;
      }
    });
  }

  GotoPage(pagenumber: number, roomname?: string) {
    const dataToSend:PageInfo ={ pageNumber: pagenumber, roomName: roomname!} ;
    this.dataFromChild.emit(dataToSend);
  }

  enterChatRoom(roomname: string) {
    const chat = {
      roomname: '',
      email: '',
      message: '',
      date: '',
      type: '',
    };
    chat.roomname = roomname;
    chat.email = this.email;
    chat.date = new Date().toISOString();
    chat.date = chat.date.replace(' ', 'T');
    chat.date = this.datepipe.transform(
      chat.date.replace(' ', 'T'),
      'yyyy-MM-ddTHH:mm'
    )!;
    chat.message = ` ${this.PersonOnPage.FirstName} enter the room`;
    chat.type = 'join';
    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chats/'));
    set(newMessageRef, chat);
    this.GotoPage(3, roomname);  
  }

  deleteRoom(roomname: string) {
    const db = getDatabase();

    const RoomRef = ref(db, 'rooms/');
    const ChatRef = ref(db, 'chats/');

    const roomRef = query(RoomRef, orderByChild('roomname'), equalTo(roomname));
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childRef = ref(db, `rooms/${childSnapshot.key}`);
          remove(childRef);
        });
      }
    });

    const chatRef = query(ChatRef, orderByChild('roomname'), equalTo(roomname));
    get(chatRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childRef = ref(db, `chats/${childSnapshot.key}`);
          remove(childRef);
        });
      }
    });
  }
}
