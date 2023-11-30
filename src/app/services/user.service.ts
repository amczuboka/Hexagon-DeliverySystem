import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  get,
  set,
  query,
  orderByChild,
  equalTo,
} from '@angular/fire/database';
import { UserDTO } from '../modules/user.models';
import { AuthService } from './auth.service';
import { Database } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * Retrieves the user matching the user ID by checking the individual, company and staff nodes in the database.
   * @param userId - The ID of the user to be retrieved.
   * @returns A Promise resolving to the retrived UserDTO.
   */
  async getUser(userId: string): Promise<UserDTO | null> {
    try {
      const db = getDatabase();
      let user = await this.getIndividualUser(db, userId);
      if (user) {
        return user;
      }
      user = await this.getCompanyUser(db, userId);
      if (user) {
        return user;
      }
      user = await this.getStaffUser(db, userId);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  private async getIndividualUser(db: Database, userId: string): Promise<UserDTO | null> {
    try {
      const userRef = ref(db, `individual/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val() as UserDTO;
      } else { 
        return null; 
      }
    } catch (error) {
      throw error;
    }
  }

  private async getCompanyUser(db: Database, userId: string): Promise<UserDTO | null> {
    try {
      const userRef = ref(db, `company/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val() as UserDTO;
      } else { 
        return null; 
      }
    } catch (error) {
      throw error;
    }
  }

  private async getStaffUser(db: Database, userId: string): Promise<UserDTO | null> {
    try {
      const userRef = ref(db, `staff/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val() as UserDTO;
      } else { 
        return null; 
      }
    } catch (error) {
      throw error;
    }
  }

}
