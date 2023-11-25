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
import { Delivery, Review } from '../modules/delivery.models';
import { AuthService } from './auth.service';
import { DeliveryService } from './delivery.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private deliveryService: DeliveryService) { 

  }

   /**
   * Adds a new Review to the corresponding delivery node in Firebase Realtime Database.
   * @param review - The Review object to be added.
   */
  async addRewview(review: Review): Promise<void> {
    try {
      var delivery = await this.deliveryService.getDeliveryById(review.id);
      if (delivery) {
        delivery.Review = review;
        await this.deliveryService.updateDelivery(delivery.Id, delivery);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }

   /**
   * Updates an existing review in the corresponding delivery node in Firebase Realtime Database.
   * @param review - The updated Review object.
   */
  async editReview(review: Review): Promise<void> {
    try {
      var delivery = await this.deliveryService.getDeliveryById(review.id);
      if (delivery) {
        delivery.Review = review;
        await this.deliveryService.updateDelivery(delivery.Id, delivery);
      }
    } catch (error) {
      console.error('Error editing review:', error);
      throw error;
    }
  }
  /**
   * Retrieves a single review by its ID from the corresponding 'deliveries' node in Firebase Realtime Database.
   * @param id - The ID of the review / delivery to be retrieved.
   * @returns A Promise resolving to the retrieved Reviews object, or null if not found.
   */
  async getSpecificReview(id: string): Promise<Review | null> {
    try {
      var delivery = await this.deliveryService.getDeliveryById(id);
      if (delivery) {
        return delivery.Review;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting review:', error);
      throw error;
    }
  }

   /**
   * Retrieves all reviews from the deliveries node in Firebase Realtime Database.
   * @returns A Promise resolving to an array of all Review objects.
   */
  async getAllReviews(): Promise<Review[]> {
    try {
      const deliveries =  await this.deliveryService.getAllDeliveries()
      var reviews: Review[] = [];
        deliveries.forEach((delivery) => {
          if (delivery.Review?.title) {
            reviews.push(delivery.Review);
          }
        });
        return reviews;
    } catch (error) {
      console.error('Error getting reviews:', error);
      throw error;
    }
  }

   /**
   * Deletes a review from the corresponding delivery node in Firebase Realtime Database.
   * @param deliveryId - The ID of the review to be deleted.
   */
  async deleteSpecificReview(id: string): Promise<void> {
    try {
      var delivery = await this.deliveryService.getDeliveryById(id);
      if (delivery) {
        delivery.Review.title = '';
        delivery.Review.description = '';
        await this.deliveryService.updateDelivery(delivery.Id, delivery);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
}
