import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Delivery,
  DeliveryFrequency,
  DeliveryStatus,
  Item,
  ItemSize,
  ItemWeight,
} from 'src/app/modules/delivery.models';
import { AppModule } from 'src/app/app.module';
import { DeliveryCardComponent } from './delivery-card.component';

describe('DeliveryCardComponent', () => {
  let component: DeliveryCardComponent;
  let fixture: ComponentFixture<DeliveryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [DeliveryCardComponent],
    });
    fixture = TestBed.createComponent(DeliveryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format items list properly', () => {
    const items: Item[] = [
      new Item('Item 1', 1, ItemSize.size1, ItemWeight.weight1),
      new Item('Item 2', 2, ItemSize.size2, ItemWeight.weight1),
      new Item('Item 3', 2, ItemSize.size2, ItemWeight.weight1),
      new Item('Item 4', 4, ItemSize.size2, ItemWeight.weight2),
    ];

    const formattedList = component.getFormattedItemsList(items);

    expect(formattedList).toEqual('Item 1, Item 2, Item 3, ...');
  });

  it('should properly check if an item matches the search criteria', () => {
    let estimatedTime = new Date();
    estimatedTime.setDate(estimatedTime.getDate() + 5);

    const item: Delivery = {
      Userid: '',
      Review: {
        stars: 4,
        title: 'Shipped to Alberta',
        description: 'Very great service from start to finish',
        date: estimatedTime.toISOString(),
        id: '123456',
        fromLocation: '',
        toLocation: '',
        username: '',
        itemNames: [],
      },
      Distance: 0,
      DepartLocation: 'Montreal',
      ArriveLocation: 'Alberta',
      Status: DeliveryStatus.Delivered,
      OrderDate: new Date().toISOString(),
      EstimatedTime: estimatedTime.toISOString(),
      Id: '123456789',
      Recurring: false,
      Frequency: DeliveryFrequency.BiWeekly,
      items: [],
      Total: 0,
      calculateTotal: function (): number {
        throw new Error('Function not implemented.');
      },
    };
    const searchText = 'Montreal';

    const isMatching = component.isItemMatchingSearch(item, searchText);

    expect(isMatching).toBe(true);
  });

  it('should calculate the total quantity of items correctly', () => {
    const items: Item[] = [
      new Item('Item 1', 1, ItemSize.size1, ItemWeight.weight1),
      new Item('Item 2', 2, ItemSize.size2, ItemWeight.weight1),
      new Item('Item 3', 2, ItemSize.size2, ItemWeight.weight1),
      new Item('Item 4', 4, ItemSize.size2, ItemWeight.weight2),
    ];

    const totalQuantity = component.calculateItemQuantity(items);

    expect(totalQuantity).toEqual(9);
  });
});
