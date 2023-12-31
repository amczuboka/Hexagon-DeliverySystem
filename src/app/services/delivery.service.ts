import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  update,
  remove,
  get,
  set,
  query,
  orderByChild,
  equalTo,
} from '@angular/fire/database';
import { Delivery } from '../modules/delivery.models';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(
    public authService: AuthService,
    public storageService: StorageService
  ) {}

  /**
   * Adds a new delivery to the 'deliveries' node in Firebase Realtime Database.
   * @param delivery - The Delivery object to be added.
   */
  async addDelivery(delivery: Delivery): Promise<void> {
    try {
      const db = getDatabase();
      const generatedId = await this.storageService.IDgenerator(
        'deliveries/',
        db
      );

      // Assign the generated ID to the delivery object
      delivery['Id'] = generatedId;

      const currentUser = this.authService.getUser(); // Get the current authenticated user
      const userAuthority = currentUser.Authority; /* Get user authority */

      let userNode: string;
      if (userAuthority === 'company') {
        userNode = 'company';
      } else {
        userNode = 'individual';
      }

      const userRef = ref(db, `${userNode}/${currentUser.uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const user = userSnapshot.val();
        if (!user.DeliveryIDs) {
          user.DeliveryIDs = []; // Initialize deliveryIDs if it doesn't exist
        }
        user.DeliveryIDs.push(generatedId); // Add generatedId to the deliveryIDs array

        // Update the user node with the updated deliveryIDs array
        await set(userRef, user);
      }

      const newDeliveryRef = ref(db, `deliveries/${generatedId}`);
      await set(newDeliveryRef, delivery);
    } catch (error) {
      console.error('Error adding delivery:', error);
      throw error;
    }
  }

  /**
   * Updates an existing delivery in the 'deliveries' node in Firebase Realtime Database.
   * @param deliveryId - The ID of the delivery to be updated.
   * @param updatedDelivery - The updated Delivery object.
   */
  async updateDelivery(
    deliveryId: string,
    updatedDelivery: Partial<Delivery>
  ): Promise<void> {
    try {
      const db = getDatabase();
      const deliveryRef = ref(db, `deliveries/${deliveryId}`); // Reference to the specific delivery
      await update(deliveryRef, updatedDelivery);
    } catch (error) {
      console.error('Error updating delivery:', error);
      throw error;
    }
  }

  /**
   * Deletes a delivery from the 'deliveries' node in Firebase Realtime Database.
   * @param deliveryId - The ID of the delivery to be deleted.
   */
  async deleteDelivery(deliveryId: string): Promise<void> {
    try {
      const db = getDatabase();
      const deliveryRef = ref(db, `deliveries/${deliveryId}`); // Reference to the specific delivery
      await remove(deliveryRef);

      const currentUser = this.authService.getUser(); // Get the current authenticated user
      const userAuthority = currentUser.Authority; /* Get user authority */

      let userNode: string;

      if (userAuthority === 'company') {
        userNode = 'company';
      } else {
        userNode = 'individual';
      }

      const userRef = ref(db, `${userNode}/${currentUser.uid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        if (userData && userData.DeliveryIDs) {
          userData.DeliveryIDs = userData.DeliveryIDs.filter(
            (id: string) => id !== deliveryId
          );

          // Update the user node with the updated deliveryIDs array
          await set(userRef, userData);
        }
      }
    } catch (error) {
      console.error('Error deleting delivery:', error);
      throw error;
    }
  }

  /**
   * Retrieves a single delivery by its ID from the 'deliveries' node in Firebase Realtime Database.
   * @param deliveryId - The ID of the delivery to be retrieved.
   * @returns A Promise resolving to the retrieved Delivery object, or null if not found.
   */
  async getDeliveryById(deliveryId: string): Promise<Delivery | null> {
    try {
      const db = getDatabase();
      const deliveryRef = ref(db, `deliveries/${deliveryId}`); // Reference to the specific delivery
      const snapshot = await get(deliveryRef);
      if (snapshot.exists()) {
        return snapshot.val() as Delivery;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting delivery by ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves all deliveries from the 'deliveries' node in Firebase Realtime Database.
   * @returns A Promise resolving to an array of all Delivery objects.
   */
  async getAllDeliveries(): Promise<Delivery[]> {
    try {
      const db = getDatabase();
      const deliveriesRef = ref(db, 'deliveries');

      const snapshot = await get(deliveriesRef);
      const deliveries: Delivery[] = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const delivery = childSnapshot.val() as Delivery;
          deliveries.push(delivery);
        });
      }

      return deliveries;
    } catch (error) {
      console.error('Error getting all deliveries:', error);
      throw error;
    }
  }

  /**
   * Retrieves all deliveries that match the current authenticated user's ID from the 'deliveries' node in Firebase Realtime Database.
   * @returns A Promise resolving to an array of Delivery objects that match the current user's ID.
   */
  async getAllDeliveriesMatchingTheUser(): Promise<Delivery[]> {
    try {
      const currentUser = this.authService.getUser(); // Get the current authenticated user
      if (!currentUser) {
        throw new Error('User not authenticated'); // Handle the case when the user is not authenticated
      }

      const db = getDatabase();
      const deliveriesRef = ref(db, 'deliveries');

      // Query deliveries where Userid matches the current user's ID
      const userDeliveriesQuery = query(
        deliveriesRef,
        orderByChild('Userid'),
        equalTo(currentUser.uid)
      );

      const snapshot = await get(userDeliveriesQuery);
      const deliveries: Delivery[] = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const delivery = childSnapshot.val() as Delivery;
          deliveries.push(delivery);
        });
      }

      return deliveries;
    } catch (error) {
      console.error('Error getting deliveries for user:', error);
      throw error;
    }
  }
}
