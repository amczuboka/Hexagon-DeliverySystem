import { from } from "rxjs";

export interface DeliveryInterface {
  Userid: string;
  Review: Review;
  Distance: number;
  DepartLocation: string;
  ArriveLocation: string;
  Status: DeliveryStatus;
  OrderDate: string;
  EstimatedTime: string;
  Id: string;
  Recurring: boolean;
  Frequency: DeliveryFrequency;
  Total: number;

  [key: string]: string | number | boolean | Review | Item[] | (() => number);
}
export interface Review {
  stars: number;
  title: string;
  description: string;
  date: string;
  fromLocation: string;
  toLocation: string;
  username: string;
  itemNames: string[];
  id: string;
}
export interface ItemInterface {
  Name: string;
  Quantity: number;
  Size: ItemSize;
  Weight: ItemWeight;
}

export enum ItemSize {
  size1 = '0.23m X 0.20m X 0.025m',
  size2 = '0.5m X 0.5m X 0.5m',
  size3 = '1m X 1m X 1m',
  size4 = '2m X 2m X 2m',
}

export enum ItemWeight {
  weight1 = '0.1kg - 5kg',
  weight2 = '5kg - 10kg',
  weight3 = '10kg - 20kg',
  weight4 = '20kg - 30kg',
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
    date: '',
    fromLocation: '',
    toLocation: '',
    username: '',
    itemNames: [],
    id: '',
  };
  Distance: number = 0;
  DepartLocation: string = '';
  ArriveLocation: string = '';
  Status: DeliveryStatus = DeliveryStatus.Quotation;
  OrderDate: string = '';
  EstimatedTime: string = '';
  Id: string = '';
  Recurring: boolean = false;
  Frequency: DeliveryFrequency = DeliveryFrequency.Once;
  items: Item[] = [];
  Total: number = 0;

  constructor(init?: Partial<Delivery>) {
    Object.assign(this, init);
  }
  [key: string]: string | number | boolean | Review | Item[] | (() => number);
}

export class Item implements ItemInterface {
  Name: string = '';
  Quantity: number = 0;
  Size: ItemSize = ItemSize.size1;
  Weight: ItemWeight = ItemWeight.weight1;
  itemPrice = 0;

  constructor(
    name: string,
    quantity: number,
    size: ItemSize,
    weight: ItemWeight
  ) {
    this.Name = name;
    this.Quantity = quantity;
    this.Size = size;
    this.Weight = weight;
  }
}
