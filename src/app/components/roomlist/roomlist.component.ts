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

  email: string | undefined;
  displayedColumns: string[] = ['roomname'];
  rooms: any[] = [];
  isLoadingResults = true;
  PersonOnPage: UserDTO = {
    FirstName: '',
    LastName: '',
    ID: '',
    Authority: '',
    Email: '',
    uid: '',
    email: '',
    photoURL: '',
    emailVerified: false,
  };
  seeAddButton = true;

  constructor(
    public datepipe: DatePipe,
    private authService: AuthService,
    private chatroomService: ChatroomService
  ) {
    const user = this.authService.getUser();
    if (user != undefined) this.email = user.email;
    else this.email = '';

    const db = getDatabase();
    onValue(ref(db, 'rooms/'), async (snapshot) => {
      this.rooms = [];
      this.rooms = snapshotToArray(snapshot);
      this.isLoadingResults = false;
      this.PersonOnPage = await this.chatroomService.getPersonOnPage(db, user);
      if (this.PersonOnPage.Authority == 'Individual' || 'Company') {
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
    const dataToSend: PageInfo = {
      pageNumber: pagenumber,
      roomName: roomname!,
    };
    this.dataFromChild.emit(dataToSend);
  }

  enterChatRoom(roomname: string) {
    this.chatroomService.addChat(
      roomname,
      this.PersonOnPage,
      this.datepipe,
      'join'
    );
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
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childRef = ref(db, `chats/${childSnapshot.key}`);
          remove(childRef);
        });
      }
    });
  }
}
