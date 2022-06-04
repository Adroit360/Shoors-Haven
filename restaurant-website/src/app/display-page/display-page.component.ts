import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, Subscription, tap } from 'rxjs';
import { FirebaseFood, OrderDetailsAdmin } from '../models/interface';
import { OrderType } from '../single-order/single-order.component';

interface Order {
  // foodName: string;
  name: string;
  phoneNumber: string;
  location: string;
  extraComments?: string;
}

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.scss'],
})
export class DisplayPageComponent implements OnInit {
  item$: Observable<OrderDetailsAdmin[]>;
  food$: Observable<FirebaseFood[]>;
  OrderType = OrderType;
  notificationAudio = new Audio('../../assets/Short-notification-sound.mp3');
  isFirstTime = true;
  itemLength: number = 0;
  subscriptions: Subscription[] = [];
  constructor(private firestore: AngularFirestore) {
    this.item$ = this.exampleGetCollection();
    this.food$ = this.onGetAllFoods();
    let itemSubs = this.item$.subscribe((res) => {
      if (!this.isFirstTime && res.length > this.itemLength)
        this.notificationAudio.play();
      else this.isFirstTime = false;

      this.itemLength = res.length;
    });

    this.subscriptions.push(itemSubs);
  }

  success: boolean = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((sub) => sub?.unsubscribe());
  }

  exampleGetCollection(): Observable<any> {
    return this.firestore
      .collection('orders', (orders) =>
        orders
          .where('completed', '==', false)
          .where('orderPaid', '==', true)
          .orderBy('date', 'desc')
      )
      .valueChanges({ idField: 'Id' });
  }

  onOrderDelivered(id: string, orderId: string): void {
    if (window.confirm(`Are you sure you want to comfirm oder: ${orderId}?`)) {
      this.updateOrder(id, { completed: true })
        // .then((res) => console.log(res))
        .catch((err) => console.log(err));
      this.success = true;
    }
  }

  onCancelOrder(id: string, orderId: string) {
    if (window.confirm(`Do you really want to delete oder: ${orderId}?`)) {
      this.deleteOrder(id)
        // .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  updateOrder(id: string, data: { completed: boolean }): Promise<void> {
    return this.firestore.collection('orders').doc(id).update(data);
  }

  deleteOrder(id: string): Promise<void> {
    return this.firestore.collection('orders').doc(id).delete();
  }
  onGetAllFoods(): Observable<any> {
    return this.firestore
      .collection('menu', (food) =>
        food.where('body', '!=', 'Banku with grilled tilapia')
      )
      .valueChanges({ idField: 'id' });
  }

  onUpdateFoodStatus(id: string, data: { status: boolean }): void {
    this.firestore.collection('menu').doc(id).update(data);
  }

  onCheckboxChange(id: string, event: Event): void {
    const isChecked = (<HTMLInputElement>event.target).checked;
    this.onUpdateFoodStatus(id, { status: isChecked });
  }
}
