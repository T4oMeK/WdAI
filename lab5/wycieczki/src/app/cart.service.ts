import { Injectable } from '@angular/core';
import { Trip } from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  trips: Trip[] = []

  setCart(trips: Trip[]){
    this.trips = trips;
  }

  getCart(): Trip[]{
    return this.trips
  }

  removeFromCart(trip: Trip) {
    this.trips.forEach((item, index) => {
      if (trip.id == item.id) {
        this.trips.splice(index, 1);
      }
    })
  }
}