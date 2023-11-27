import { Injectable } from '@angular/core';
import { Database, get, query, ref } from 'firebase/database';
import { User, UserDTO } from '../modules/user.models';

@Injectable({
  providedIn: 'root',
})
export class ChatroomService {
  constructor() {}

  async getPersonOnPage(db: Database, user: User): Promise<UserDTO> {
    let personOnPage = {} as UserDTO;

    if (user.photoURL == 'Individual') {
      const userRef = query(ref(db, 'individual/' + user.uid));
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
}
