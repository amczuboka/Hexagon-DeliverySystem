export interface DeliveryInterface {
  Userid: string;
  Review: Review;
  Distance: number;
  DepartLocation: string;
  ArriveLocation: string;
  Status: DeliveryStatus;
  orderDate: Date;
  EstimatedTime: Date;
  Id: string;
  Recurring: boolean;
  Frequency: DeliveryFrequency;
  Total: number;

  calculateTotal(): number;

  [key: string]: string | number | boolean | Date | Review | Item[]| (() => number);

}
export interface Review {
  stars: number;
  title: string;
  description: string;
  date: Date;
  id: string;
}
export interface ItemInterface {
  Name: string;
  Quantity: number;
  Size: ItemSize;
  Weight: ItemWeight;
  calculateItemPrice(): number;
}

export enum ItemSize {
  size1 = '1',
  size2 = '2',
  size3 = '3',
  size4 = '4'
}

export enum ItemWeight {
  weight1 = '1',
  weight2 = '2',
  weight3 = '3',
  weight4 = '4'
}

export enum DeliveryStatus {
  Quotation = 'Quotation',
  Pending = 'Pending',
  EnRoute = 'En Route',
  Delivered = 'Delivered',
}

export enum DeliveryFrequency {
  Once = 'Once',
  Weekly = 'Weekly',
  BiWeekly = 'Bi-Weekly',
  Monthly = 'Monthly',
}

export class Delivery implements DeliveryInterface {
  Userid: string = '';
  Review: Review = {
    stars: 0,
    description: '',
    title: '',
    date: new Date(),
    id: '',
  };
  Distance: number = 0;
  DepartLocation: string = '';
  ArriveLocation: string = '';
  Status: DeliveryStatus = DeliveryStatus.Quotation;
  orderDate: Date = new Date();
  EstimatedTime: Date = new Date();
  Id: string = '';
  Recurring: boolean = false;
  Frequency: DeliveryFrequency = DeliveryFrequency.Once;
  items: Item[] = [];
  Total: number = this.calculateTotal();

  constructor(init?: Partial<Delivery>) {
    Object.assign(this, init);
  }
  [key: string]: string | number | boolean | Date | Review | Item[] | (() => number);

  calculateTotal(): number {
    return 0;
  }
}

export class Item implements ItemInterface {
  Name: string = '';
  Quantity: number = 0;
  Size: ItemSize = ItemSize.size1;
  Weight: ItemWeight = ItemWeight.weight1;
  itemPrice = this.calculateItemPrice();

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }

  calculateItemPrice(): number {
    return 0;
  }
}
