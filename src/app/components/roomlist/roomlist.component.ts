import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app';

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

    firebase
      .database()
      .ref('rooms/')
      .on('value', (resp) => {
        this.rooms = [];
        this.rooms = snapshotToArray(resp);
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
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);

    firebase
      .database()
      .ref('roomusers/')
      .orderByChild('roomname')
      .equalTo(roomname)
      .on('value', (resp: any) => {
        let roomuser = [];
        roomuser = snapshotToArray(resp);
        const user = roomuser.find((x) => x.email === this.email);
        if (user !== undefined) {
          const userRef = firebase.database().ref('roomusers/' + user.key);
          userRef.update({ status: 'online' });
        } else {
          const newroomuser = { roomname: '', email: '', status: '' };
          newroomuser.roomname = roomname;
          newroomuser.email = this.email;
          newroomuser.status = 'online';
          const newRoomUser = firebase.database().ref('roomusers/').push();
          newRoomUser.set(newroomuser);
        }
      });

    this.router.navigate(['/chatroom', roomname]);
  }
}
