import { Injectable } from '@angular/core';
import {
  Database,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  set,
} from 'firebase/database';
import { User, UserDTO } from '../modules/user.models';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { PageInfo } from '../modules/chatbox.models';

@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  private pageNumberSource = new BehaviorSubject({} as PageInfo);
  pageNumber$ = this.pageNumberSource.asObservable();
  constructor() {}

  setPageNumber(value: PageInfo) {
    this.pageNumberSource.next(value);
  }

  async getPersonOnPage(db: Database, user: User): Promise<UserDTO> {
    let personOnPage = {} as UserDTO;

    if (user.photoURL == 'Individual') {
      const userRef = query(ref(db, 'individual/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    }

    if (user.photoURL == 'Company') {
      const userRef = query(ref(db, 'company/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    }

    if (user.photoURL == 'Staff') {
      const userRef = query(ref(db, 'staff/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    }

    return personOnPage;
  }

  addChat(
    roomname: string,
    PersonOnPage: UserDTO,
    datepipe: DatePipe,
    type: string,
    form?: any
  ) {
    let chat = {
      roomname: '',
      name: '',
      message: '',
      date: '',
      type: '',
    };
    if (form) {
      chat = form;
    }
    chat.roomname = roomname;
    chat.name = PersonOnPage.FirstName;
    chat.date = new Date().toISOString();
    chat.date = chat.date.replace(' ', 'T');
    chat.date = datepipe.transform(chat.date, 'yyyy-MM-ddTHH:mm')!;
    if (type == 'exit') {
      chat.message = ` ${PersonOnPage.FirstName} left the room`;
    } else if (type == 'join') {
      chat.message = ` ${PersonOnPage.FirstName} joined the room`;
    }
    chat.type = type;
    const db = getDatabase();
    const RoomRef = ref(db, 'rooms/');
    const roomRef = query(RoomRef, orderByChild('roomname'), equalTo(roomname));
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // const childRef = ref(db, `rooms/${childSnapshot.key}`);
          const newMessageRef = push(
            ref(db, `rooms/${childSnapshot.key}/chats/`)
          );
          set(newMessageRef, chat);
        });
      }
    });
  }
}
