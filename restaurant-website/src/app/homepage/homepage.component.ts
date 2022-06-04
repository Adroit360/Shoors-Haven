import { Firestore } from '@angular/fire/firestore';
import { SocketService } from './../services/socket-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FirebaseFood } from '../models/interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  private socket: any;
  item$: Observable<FirebaseFood[]>;
  firestore: any;
  constructor(
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient,
    private fireStore: AngularFirestore
  ) {
    this.socket = io('https://gob3-friday.herokuapp.com/');
    // this.socket = io('http://localhost:8000/');
    this.item$ = this.onGetAllFoods();
    this.item$.subscribe((res: any) => {
      console.log(res);
    });
  }

  foodArray: any;
  closingTime: string = '';
  currentTime: string = '';
  public orderStatus: boolean = false;
  breakTime: { closingTime: string; openingTime: string } = {
    closingTime: '',
    openingTime: '',
  };
  closingTimeError = false;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    // this.breakTime = this.socketService.getClosingTime();
    // this.http
    //   .get('https://gob3-friday.herokuapp.com/')
    //   .subscribe((res: any) => {
    //     this.orderStatus = res.orderStatus;
    //     const currentDate = new Date();
    //     const currentTime = currentDate.toString().split(' ')[4].toString();
    //     if (
    //       currentTime < this.breakTime.openingTime ||
    //       currentTime > this.breakTime.closingTime ||
    //       this.orderStatus
    //     ) {
    //       this.closingTimeError = true;
    //     } else {
    //       this.closingTimeError = false;
    //     }
    //   });

    this.http
      .get('https://gob3-friday.herokuapp.com/')
      .subscribe((res: any) => {
        this.orderStatus = res.orderStatus;
        if (this.orderStatus) {
          this.closingTimeError = true;
        } else {
          this.closingTimeError = false;
        }
      });

    this.socket.on('orderStatus', (res: { orderStatus: boolean }) => {
      this.orderStatus = res.orderStatus;
      if (res.orderStatus) {
        this.closingTimeError = true;
      } else {
        this.closingTimeError = false;
      }
    });

    this.foodArray = this.socketService.getAllFoods();
  }

  onProceedToOrderPage(id: number): void {
    // const currentDate = new Date();
    // const currentTime = currentDate.toString().split(' ')[4].toString();
    // if (
    //   currentTime < this.breakTime.openingTime ||
    //   currentTime > this.breakTime.closingTime ||
    //   this.orderStatus
    // ) {
    //   this.closingTimeError = true;
    // } else {
    //   this.closingTimeError = false;
    //   this.router.navigate(['/orders', id]);
    // }
    if (this.orderStatus) {
      this.closingTimeError = true;
    } else {
      this.closingTimeError = false;
      this.router.navigate(['/orders', id]);
    }
  }

  onGetAllFoods(): Observable<any> {
    return this.fireStore.collection('menu').valueChanges({ idField: 'id' });
  }
}
