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
  update,
  Database,
  get,
} from 'firebase/database';
import { User, UserDTO } from 'src/app/modules/user.models';

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
    PersonOnPage!: UserDTO;


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

        this.getPersonOnPage(db, user);

  }

    async getPersonOnPage(db: Database, user: User) {
    if (user.photoURL == 'Individual') {
      const userRef = query(ref(db, 'individual/' + user.uid));
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.PersonOnPage = snapshot.val();
        }
      });
    }}

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
        chat.date = this.datepipe.transform(chat.date.replace(' ', 'T'), 'yyyy-MM-ddTHH:mm')!;
    chat.message = ` ${this.PersonOnPage.FirstName} enter the room`;
    chat.type = 'join';
    const db = getDatabase();
    const newMessageRef = push(ref(db, 'chats/'));
    set(newMessageRef, chat);

    this.router.navigate(['/chatroom',roomname]);
  }
}
