// Import necessary modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Delivery,
  DeliveryStatus,
  Item,
} from 'src/app/modules/delivery.models';
import { AuthService } from 'src/app/services/auth.service';
import AOS from 'aos';

@Component({
  selector: 'app-delivery-card',
  templateUrl: './delivery-card.component.html',
  styleUrls: ['./delivery-card.component.scss'],
})
export class DeliveryCardComponent {
  /**
   * Array to store delivery items
   */
  deliveries: Delivery[] = [];

  /**
   * User information
   */
  myUser!: any;

  /**
   * Search text for filtering deliveries
   */
  searchText: string = '';

  /**
   * Inject AuthService in the constructor
   *
   * @param authService - The authentication service
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Lifecycle hook called after component initialization
   */
  ngOnInit() {
    AOS.init();
    // Get user information
    this.myUser = this.authService.getUser();

    this.pushDeliveries();
  }

  pushDeliveries(): void {
    // Create sample items
    let items1: Item[] = [
      new Item('Shipping Equipement', 1, 50, 30, 20, 5),
      new Item('Bolts', 2, 50, 30, 20, 5),
      new Item('Screws', 2, 50, 30, 20, 5),
      new Item('Knobs', 2, 50, 30, 20, 5),
    ];

    let items2: Item[] = [
      new Item('Wrench', 1, 40, 25, 15, 3),
      new Item('Nails', 3, 30, 15, 10, 2),
      new Item('Screwdriver', 1, 35, 20, 12, 4),
      new Item('Hinges', 4, 45, 25, 18, 6),
    ];

    let items3: Item[] = [
      new Item('Paintbrushes', 5, 40, 20, 15, 3),
      new Item('Door Handles', 3, 50, 30, 22, 5),
    ];

    let items4: Item[] = [
      new Item('Pliers', 2, 45, 28, 17, 4),
      new Item('Wood Glue', 3, 25, 15, 10, 2),
      new Item('Drill Bits', 4, 55, 35, 22, 6),
    ];

    //First Delivery
    let delivery1 = new Delivery();
    delivery1.items = items1;
    let estimatedTime1 = new Date();
    estimatedTime1.setDate(estimatedTime1.getDate() + 5);
    delivery1.EstimatedTime = estimatedTime1;
    delivery1.ArriveLocation = 'Montreal, Beaconsfield, H79 B7S';
    delivery1.Id = '102972814683';
    delivery1.Total = 37.94;
    delivery1.Status = DeliveryStatus.Quotation;
    this.deliveries.push(delivery1);

    //Second Delivery
    let delivery2 = new Delivery();
    delivery2.items = items2;
    let estimatedTime2 = new Date();
    estimatedTime2.setDate(estimatedTime2.getDate() + 10);
    delivery2.EstimatedTime = estimatedTime2;
    delivery2.ArriveLocation = 'Montreal, Kirkland, H9W 6B5';
    delivery2.Id = '12344568932';
    delivery2.Total = 40.94;
    delivery2.Status = DeliveryStatus.EnRoute;
    this.deliveries.push(delivery2);

    //Third Delivery
    let delivery3 = new Delivery();
    delivery3.items = items3;
    let estimatedTime3 = new Date();
    estimatedTime3.setDate(estimatedTime3.getDate() + 9);
    delivery3.EstimatedTime = estimatedTime3;
    delivery3.ArriveLocation = 'Montreal, Saint Laurent, C7G 6K8';
    delivery3.Id = '9877652423';
    delivery3.Total = 79.24;
    delivery3.Status = DeliveryStatus.Pending;
    this.deliveries.push(delivery3);

    //Fourth Delivery
    let delivery4 = new Delivery();
    delivery4.items = items4;
    let estimatedTime4 = new Date();
    estimatedTime4.setDate(estimatedTime4.getDate() + 12);
    delivery4.EstimatedTime = estimatedTime4;
    delivery4.ArriveLocation = 'Quebec, Saint Louis, B6T 8S5';
    delivery4.Id = '5475325786';
    delivery4.Total = 101.14;
    delivery4.Status = DeliveryStatus.Delivered;
    this.deliveries.push(delivery4);
  }

  /**
   * Format items list for display
   *
   * @param items - The list of items to format
   * @return The formatted string
   */
  getFormattedItemsList(items: Item[]): string {
    return (
      items
        .slice(0, 3)
        .map((it) => it.Name)
        .join(', ') + (items.length > 3 ? ', ...' : '')
    );
  }

  /**
   * Handle search text changes
   *
   * @param searchValue - The new search text
   */
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  /**
   * Check if an item matches the search criteria
   *
   * @param item - The delivery item to check
   * @param searchText - The search text to match
   * @return True if the item matches the search criteria, false otherwise
   */
  isItemMatchingSearch(item: Delivery, searchText: string): boolean {
    const lowerCaseSearchText = searchText.toLowerCase();

    // Iterate over the properties of the item and check if any match the search criteria
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const propertyValue = item[key];

        // Exclude type "Recurring or totalPrice"
        if (
          typeof propertyValue !== 'boolean' &&
          typeof propertyValue !== 'function'
        ) {
          // For Items, check each item's name
          if (Array.isArray(propertyValue)) {
            const itemArray = propertyValue as Item[];
            if (
              itemArray.some((item) =>
                item.Name.toLowerCase().includes(lowerCaseSearchText)
              )
            ) {
              return true;
            }
          } else {
            // For every other attribute in Delivery, check if the property value includes the search text
            const stringValue = String(propertyValue).toLowerCase();
            if (stringValue.includes(lowerCaseSearchText)) {
              return true;
            }
          }
        }
      }
    }

    // If no match is found, return false
    return false;
  }

  /**
   * Navigate to the delivery summary page for the selected delivery item
   *
   * @param item - The delivery item to view the summary for
   */
  navigateToDeliverySummary(item: Delivery): void {
    // Prepare navigation extras with the selected delivery item as a query parameter
    let navigationExtras = { queryParams: { delivery: JSON.stringify(item) } };

    // Navigate to the delivery summary page with the specified navigation extras
    this.router.navigate(['../delivery-summary'], navigationExtras);
  }

  /**
   * Calculate the total quantity of items in the given array
   *
   * @param items - The array of items to calculate the quantity for
   * @return The total quantity of items
   */
  calculateItemQuantity(items: Item[]): number {
    // Initialize the quantity variable to 0
    let quantity = 0;

    // Iterate through each item in the array and accumulate the quantity
    items.forEach((item) => {
      quantity += item.Quantity;
    });

    // Return the total quantity of items
    return quantity;
  }
}
