import {
  Delivery,
  Item,
  ItemSize,
  ItemWeight,
} from 'src/app/modules/delivery.models';
import { DistanceCalculationService } from './distance-calculation.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculateTotalDeliveryService {
  constructor(private distanceCalculationService: DistanceCalculationService) {}

  // Function to calculate the total delivery price
  public calculateTotalDeliveryPrice(delivery: Delivery): Observable<Delivery> {
    return new Observable<Delivery>((observer) => {
      this.distanceCalculationService
        .calculateDistance(delivery.DepartLocation, delivery.ArriveLocation)
        .subscribe((distance) => {
          let partialTotal: number = 0;

          // Calculate item price for each item in the delivery
          for (let item of delivery.items) {
            // This changes the item price in the delivery object
            item.itemPrice = this.calculateItemPrice(item);
            partialTotal += item.itemPrice;
          }

          // Calculate the total delivery price
          var total = partialTotal + Math.floor(2 * (distance / 50));
          delivery.Total = total;
          observer.next(delivery);
          observer.complete();
        });
    });
  }

  // Function to calculate the item price
  private calculateItemPrice(item: Item): number {
    var priceForSize = 0;
    var priceForWeight = 0;
    var total = 0;

    // Calculate price for item size
    if (item.Size == ItemSize.size1) {
      priceForSize = 6.95;
    }

    if (item.Size == ItemSize.size2) {
      priceForSize = 16.5;
    }

    if (item.Size == ItemSize.size3) {
      priceForSize = 24.55;
    }

    if (item.Size == ItemSize.size4) {
      priceForSize = 27.05;
    }

    // Calculate price for item weight
    if (item.Weight == ItemWeight.weight1) {
      priceForWeight = 15.96;
    }

    if (item.Weight == ItemWeight.weight2) {
      priceForWeight = 29.57;
    }

    if (item.Weight == ItemWeight.weight3) {
      priceForWeight = 35.81;
    }

    if (item.Weight == ItemWeight.weight4) {
      priceForWeight = 50.33;
    }

    // Calculate total item price
    total = item.Quantity * (priceForSize + priceForWeight);

    return total;
  }
}
