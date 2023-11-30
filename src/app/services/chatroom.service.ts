// Import necessary modules and components from Angular and Firebase
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

/**
 * Service for managing chatroom-related functionality.
 */
@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  // BehaviorSubject to store and observe page number information
  private pageNumberSource = new BehaviorSubject({} as PageInfo);
  pageNumber$ = this.pageNumberSource.asObservable();

  // Constructor of the service
  constructor() {}

  /**
   * Set the page number to be observed by subscribers.
   * @param value - The PageInfo object representing page information.
   */
  setPageNumber(value: PageInfo) {
    this.pageNumberSource.next(value);
  }
  

  /**
   * Retrieve information about a person based on the user type.
   * @param db - The Firebase Database instance.
   * @param user - The User object representing the current user.
   * @return A Promise resolving to a UserDTO object with information about the person on the page.
   */
  async getPersonOnPage(db: Database, user: User): Promise<UserDTO> {
    let personOnPage = {} as UserDTO;

    // Check user type and query the corresponding database node
    if (user.photoURL == 'Individual') {
      const userRef = query(ref(db, 'individual/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    } else if (user.photoURL == 'Company') {
      const userRef = query(ref(db, 'company/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    } else if (user.photoURL == 'Staff') {
      const userRef = query(ref(db, 'staff/' + user.uid));
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        personOnPage = snapshot.val();
      }
    }

    return personOnPage;
  }

  /**
   * Add a chat message to the specified room.
   * @param roomname - The name of the chatroom.
   * @param PersonOnPage - The UserDTO object representing the person on the page.
   * @param datepipe - The DatePipe service for formatting dates.
   * @param type - The type of chat message (e.g., 'exit' or 'join').
   * @param form - Optional form data for the chat message.
   */
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

    // If form data is provided, use it; otherwise, use default values
    if (form) {
      chat = form;
    }

    // Populate chat object with relevant information
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

    // Get Firebase database reference
    const db = getDatabase();
    const RoomRef = ref(db, 'rooms/');

    // Query the rooms to find the one with the specified room name
    const roomRef = query(RoomRef, orderByChild('roomname'), equalTo(roomname));

    // Check if the room exists
    get(roomRef).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          // Get a reference to the specific room and push the new chat message
          const newMessageRef = push(
            ref(db, `rooms/${childSnapshot.key}/chats/`)
          );
          set(newMessageRef, chat);
        });
      }
    });
  }
}
