// Import necessary modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Delivery, Item } from 'src/app/modules/delivery.models';
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

    // Create sample items
    let items: Item[] = [
      new Item('Shipping Equipement', 1, 50, 30, 20, 5),
      new Item('Bolts', 2, 50, 30, 20, 5),
      new Item('Screws', 2, 50, 30, 20, 5),
      new Item('Knobs', 2, 50, 30, 20, 5),
    ];

    // Create sample deliveries
    for (let i = 0; i < 3; i++) {
      let delivery = new Delivery();
      delivery.items = items;
      let estimatedTime = new Date();
      estimatedTime.setDate(estimatedTime.getDate() + 5);
      delivery.EstimatedTime = estimatedTime;
      delivery.ArriveLocation = 'Montreal, Beaconsfield, H79 B7S';
      delivery.Id = '102972814683';
      delivery.Total = 37.94;
      this.deliveries.push(delivery);
    }
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

  navigateToDeliverySummary(item: Delivery): void {
    let navigationExtras = { queryParams: { delivery: JSON.stringify(item) } };
    this.router.navigate(['../delivery-summary'], navigationExtras);
  }
}
