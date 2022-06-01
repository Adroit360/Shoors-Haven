import { Injectable } from '@angular/core';
import { Food } from '../models/interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  orderStatusEvent: Subject<boolean> = new Subject<boolean>();
  constructor() {}
  closingTime: string = '19:00:00';
  openingTime = '07:00:00';
  foodArray: Food[] = [
    {
      id: '33cc84aebc4b49b9bdc181782680c493',
      body: 'Jollof with fried chicken',
      image: '../../assets/standardPack.jpeg',
      alt: 'Jollof with fried chicken',
      price: '30.00',
    },
    {
      id: '3646754e10574da3a16a90e2ecff5e06',
      body: 'Jollof with pork',
      image: '../../assets/gob3StandardPackFull.jpeg',
      alt: 'Jollof with pork',
      price: '35.00',
    },
    {
      id: '4226d4f1e91e404880345bc18be88e5b',
      body: 'Banku with grilled tilapia',
      image: '../../assets/fullSize.jpeg',
      alt: 'Banku with grilled tilapia',
      price: '35.00',
    },
    {
      id: 'ddbf19c31b9c4844865bf59fbb8fc985',
      body: 'Banku with grilled tilapiag',
      image: '../../assets/withEgg.jpeg',
      alt: 'Banku with grilled tilapia',
      price: '45.00',
    },
    {
      id: 'ab62ad68aff443afa4c827a78a22e3a3',
      body: 'Banku with grilled tilapia',
      image: '../../assets/withFish.jpeg',
      alt: 'Banku with grilled tilapia',
      price: '55.00',
    },
    {
      id: '6fe15e03186f478b8c2399ae70a51960',
      body: 'gob3 with chicken',
      image: '../../assets/withChicken.jpeg',
      alt: 'gob3 with chicken',
      price: '23.00',
    },
    {
      id: 'c4d3ddc886c540149323387915598847',
      body: 'Banku with okro stew',
      image: '../../assets/withGizzard.jpeg',
      alt: 'Banku with okro stew',
      price: '30.00',
    },

    {
      id: '4d2da93389ce48aa8841c56891494942',
      body: 'yam chips with fried pork',
      image: '../../assets/jumboPack.jpeg',
      alt: 'yam chips with fried pork',
      price: '435.00',
    },
    {
      id: 'c92a574c98634a70998b71d110f51fd5',
      body: 'yam chips with fried chicken',
      image: '../../assets/aboboi.jpg',
      alt: 'yam chips with fried chicken',
      price: '30.00',
    },
  ];

  getFoodByID(id: string): Food {
    return this.foodArray.filter((item) => item.id === id)[0];
  }

  getAllFoods(): Food[] {
    return this.foodArray;
  }

  getClosingTime(): { closingTime: string; openingTime: string } {
    return { closingTime: this.closingTime, openingTime: this.openingTime };
  }
}
