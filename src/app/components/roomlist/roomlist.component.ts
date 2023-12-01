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

/**
 * Utility function to convert Firebase snapshot to an array.
 * @param snapshot - The Firebase snapshot to be converted.
 * @returns An array containing the snapshot data.
 */
export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

/**
 * RoomlistComponent represents the component for displaying and managing chat rooms.
 */
@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.scss'],
})
export class RoomlistComponent {
  /** Event emitter to send data to the parent component. */
  @Output() dataFromChild = new EventEmitter<any>();

  /** Email of the current user. */
  email: string | undefined;

  /** Displayed columns in the room list. */
  displayedColumns: string[] = ['roomname'];

  /** Array containing information about chat rooms. */
  rooms: any[] = [];

  /** Loading indicator for room data. */
  isLoadingResults = true;

  /** Information about the person currently on the page. */
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

  /** Flag to determine whether to display the "Add" button. */
  seeAddButton = true;

  /**
   * Constructor of the RoomlistComponent.
   * @param datepipe - The DatePipe service for formatting dates.
   * @param authService - The AuthService for user authentication.
   * @param chatroomService - The ChatroomService for managing chatroom-related functionality.
   */
  constructor(
    public datepipe: DatePipe,
    private authService: AuthService,
    private chatroomService: ChatroomService
  ) {
    // Get the current user's email
    const user = this.authService.getUser();
    if (user != undefined) this.email = user.email;
    else this.email = '';

    // Initialize Firebase database and subscribe to changes in room data
    const db = getDatabase();
    onValue(ref(db, 'rooms/'), async (snapshot) => {
      this.rooms = [];
      this.rooms = snapshotToArray(snapshot);
      this.isLoadingResults = false;
      this.PersonOnPage = await this.chatroomService.getPersonOnPage(db, user);

      // Filter rooms based on user authority
      if (this.PersonOnPage) {
        if (
          this.PersonOnPage.Authority == 'Individual' ||
          this.PersonOnPage.Authority == 'Company'
        ) {
          this.rooms = this.rooms.filter(
            (room) => room.creater === this.PersonOnPage.ID
          );
        }

        // Hide "Add" button for Staff users
        if (this.PersonOnPage.Authority == 'Staff') {
          this.seeAddButton = false;
        }
      }
    });
  }

  /**
   * Navigate to a specific page with room data.
   * @param pagenumber - The page number to navigate to.
   * @param roomname - Optional room name to pass to the parent component.
   */
  GotoPage(pagenumber: number, roomname?: string) {
    const dataToSend: PageInfo = {
      pageNumber: pagenumber,
      roomName: roomname!,
    };
    this.dataFromChild.emit(dataToSend);
  }

  /**
   * Enter a chat room and emit a "join" chat message.
   * @param roomname - The name of the chat room to enter.
   */
  enterChatRoom(roomname: string) {
    this.chatroomService.addChat(
      roomname,
      this.PersonOnPage,
      this.datepipe,
      'join'
    );
    this.GotoPage(3, roomname);
  }

  /**
   * Delete a chat room and its associated chat messages.
   * @param roomname - The name of the chat room to delete.
   */
  deleteRoom(roomname: string) {
    const db = getDatabase();

    const RoomRef = ref(db, 'rooms/');
    const ChatRef = ref(db, 'chats/');

    // Delete the room
    const roomRef = query(RoomRef, orderByChild('roomname'), equalTo(roomname));
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childRef = ref(db, `rooms/${childSnapshot.key}`);
          remove(childRef);
        });
      }
    });
  }
}
