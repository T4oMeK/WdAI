import { Component, OnInit } from '@angular/core';
import { Trip } from '../trips/trips.component';
import { CartService } from '../cart.service';
import { TripsHistoryService } from '../trips-history.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private cartService: CartService,
    private tripsHistoryService: TripsHistoryService) {}
  
  cart: Trip[] = [];

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  isTripComing(): boolean {
    return this.tripsHistoryService.sevenDays();
  }

  getCartValue(): number {
    let sum = 0;
    for (let trip of this.cart) {
      sum += trip.price * trip.spots;
    }
    return sum;
  }

  getCartQuantity(): number {
    let sum = 0;
    for (let trip of this.cart) {
      sum += trip.spots;
    }
    return sum;
  }

}
