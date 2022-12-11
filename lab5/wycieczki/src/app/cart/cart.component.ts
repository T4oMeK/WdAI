import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Trip } from '../trips/trips.component'
import { TripsHistoryService } from '../trips-history.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService,
    private tripsHistoryService: TripsHistoryService) {}

  cart: Trip[] = [];

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  sum() {
    let sum = 0;
    for (let trip of this.cart) {
      sum += trip.spots * trip.price;
    }
    return sum;
  }

  buy(trip: Trip) {
    this.tripsHistoryService.addToHistory(trip);
    this.cartService.removeFromCart(trip);
    trip.spots = 0;
  }
}
