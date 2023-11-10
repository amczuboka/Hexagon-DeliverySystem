export interface DeliveryInterface {
  Userid: string;
  Review: Review;
  Distance: number;
  DepartLocation: string;
  ArriveLocation: string;
  Status: DeliveryStatus;
  EstimatedTime: Date;
  Id: string;
  Recurring: boolean;
  Total: number;
  calculateTotal(): number;
}
export interface Review {
  stars: number;
  description: string;
  deliveryID: string;
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

export class Delivery implements DeliveryInterface {
  Userid: string = '';
  Review: Review = {
    stars: 0,
    description: '',
    deliveryID: '',
  };
  Distance: number = 0;
  DepartLocation: string = '';
  ArriveLocation: string = '';
  Status: DeliveryStatus = DeliveryStatus.Quotation;
  EstimatedTime: Date = new Date();
  Id: string = '';
  Recurring: boolean = false;
  items: Item[] = [];
  Total: number = this.calculateTotal();

  constructor(init?: Partial<Delivery>) {
    Object.assign(this, init);
  }

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
  itemPrice = this.calculateItemPrice();

  constructor(
    name: string,
    quantity: number,
    height: number,
    length: number,
    width: number,
    weight: number
  ) {
    this.Name = name;
    this.Quantity = quantity;
    this.Height = height;
    this.Length = length;
    this.Width = width;
    this.Weight = weight;
  }

  calculateItemPrice(): number {
    return 0;
  }
}
