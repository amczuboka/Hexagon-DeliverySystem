// Import necessary modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Delivery,
  DeliveryFrequency,
  DeliveryStatus,
  Item,
  ItemSize,
  ItemWeight,
} from 'src/app/modules/delivery.models';
import AOS from 'aos';
import { DeliveryService } from 'src/app/services/delivery.service';
import { AuthService } from 'src/app/services/auth.service';

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
   * Search text for filtering deliveries
   */
  searchText: string = '';

  /**
   * boolean representing if deliveries exists
   */
  deliveriesExist: boolean = true;

  /**
   * Inject AuthService in the constructor
   *
   * @param authService - The authentication service
   */
  constructor(
    private deliveryService: DeliveryService,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * Lifecycle hook called after component initialization
   */
  ngOnInit() {
    AOS.init();
    var myUser = this.authService.getUser();
    if (myUser) {
      if (myUser.photoURL == 'Staff') {
        this.deliveryService
          .getAllDeliveries()
          .then((deliveries) => {
            this.deliveries = deliveries;
            console.log(this.deliveries)
          })
          .catch((error) => {
            console.log('Error getting deliveries:', error);
          });
      } else {
        this.deliveryService
          .getAllDeliveriesMatchingTheUser()
          .then((deliveries) => {
            this.deliveries = deliveries;
          })
          .catch((error) => {
            console.log('Error getting deliveries:', error);
          });
      }
    }
  }

  /**
   * Lifecycle hook called after every check of the component's content.
   * Checks if deliveries exist and updates the flag accordingly.
   */
  ngAfterContentChecked() {
    if (this.deliveries) {
      if (this.deliveries.length === 0) {
        this.deliveriesExist = false;
      } else {
        this.deliveriesExist = true;
      }
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
      if (Object.hasOwn(item, key)) {
        const propertyValue = item[key];

        // Exclude type "Recurring or totalPrice"
        if (
          typeof propertyValue !== 'boolean' &&
          typeof propertyValue !== 'function'
        ) {
          // For Items, check each item's name
          if (Array.isArray(propertyValue)) {
            const itemArray = propertyValue;
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
