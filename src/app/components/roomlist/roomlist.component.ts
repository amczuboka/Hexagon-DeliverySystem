import { Component } from '@angular/core';
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
} from 'firebase/database';

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
  email: string;
  displayedColumns: string[] = ['roomname'];
  rooms: any[] = [];
  isLoadingResults = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public datepipe: DatePipe
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.email = user.email;

    const db = getDatabase();
    onValue(ref(db, 'rooms/'), (snapshot) => {
      this.rooms = [];
      this.rooms = snapshotToArray(snapshot);
      this.isLoadingResults = false;
    });
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
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')!;
    chat.message = `${this.email} enter the room`;
    chat.type = 'join';
    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chats/'));
    set(newMessageRef, chat);

  onValue(
    query(ref(db, 'roomusers/'), orderByChild('roomname'), equalTo(roomname)),
    (snapshot) => {
      let roomuser: any[] = [];
      snapshot.forEach((childSnapshot) => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        roomuser.push(item);
      });
      const user = roomuser.find((x: any) => x.email === this.email);
      if (user !== undefined) {
        const userRef = ref(db, 'roomusers/' + user.key);
        set(userRef, { status: 'online' });
      } else {
        const newroomuser = { roomname: '', email: '', status: '' };
        newroomuser.roomname = roomname;
        newroomuser.email = this.email;
        newroomuser.status = 'online';
        const newRoomUserRef = push(ref(db, 'roomusers/'));
        set(newRoomUserRef, newroomuser);
      }
    }
  );

    this.router.navigate(['/chatroom',roomname]);
  }
}
