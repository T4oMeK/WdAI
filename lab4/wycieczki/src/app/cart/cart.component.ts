import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../trips/trips.component'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
  }

  @Input('trips') trips: Trip[] = []

  getBoughtTrips() {
    return this.trips.filter((item) => item.spots !== 0);
  }

  sum() {
    let sum = 0;
    for (let trip of this.getBoughtTrips()) {
      sum += trip.spots * trip.price;
    }
    return sum;
  }
}
