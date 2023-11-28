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
  size1 = '0.23m X 0.20m X 0.025m',
  size2 = '0.5m X 0.5m X 0.5m',
  size3 = '1m X 1m X 1m',
  size4 = '2m X 2m X 2m'
}

export enum ItemWeight {
  weight1 = '0.1kg - 5kg',
  weight2 = '5kg - 10kg',
  weight3 = '10kg - 20kg',
  weight4 = '20kg - 30kg'
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

  calculateItemPrice(): number {
    var priceForSize = 0;
    var priceForWeight = 0;
    var total = 0;

    //if-statements to calculate price for item size
    if (this.Size == ItemSize.size1){
      priceForSize = 6.95;
    }

    if (this.Size == ItemSize.size2){
      priceForSize = 16.50;
    }

    if (this.Size == ItemSize.size3){
      priceForSize = 24.55;
    }

    if (this.Size == ItemSize.size4){
      priceForSize = 27.05;
    }

    //if-statements to calculate price for item weight
    if (this.Weight == ItemWeight.weight1){
      priceForWeight = 15.96;
    }

    if (this.Weight == ItemWeight.weight2){
      priceForWeight = 29.57;
    }

    if (this.Weight == ItemWeight.weight3){
      priceForWeight = 35.81;
    }

    if (this.Weight == ItemWeight.weight4){
      priceForWeight = 50.33;
    }

    //calculating total
    total = this.Quantity * (priceForSize + priceForWeight);

    return total;
  }
}
