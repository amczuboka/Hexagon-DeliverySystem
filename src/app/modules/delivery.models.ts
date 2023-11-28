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
  Height: number;
  Length: number;
  Width: number;
  Weight: number;
  calculateItemPrice(): number;
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
  Height: number = 0;
  Length: number = 0;
  Width: number = 0;
  Weight: number = 0;
  Size: number = 0;
  itemPrice = this.calculateItemPrice();

  constructor(
    name: string,
    quantity: number,
    height: number,
    length: number,
    width: number,
    weight: number,
    size: number
  ) {
    this.Name = name;
    this.Quantity = quantity;
    this.Height = height;
    this.Length = length;
    this.Width = width;
    this.Weight = weight;
    this.Size = size;
  }

  calculateItemPrice(): number {
    return 0;
  }
}
