import { Component, OnInit } from '@angular/core';
import { TripsPipe } from './trips-filter.pipe';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { TripsService } from '../trips.service';
import { Firestore, collectionData, orderBy, collection, query, getDocs } from '@angular/fire/firestore';
import { FirestoreService } from '../firestore.service';

export interface Trip {
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  maxSpots: number;
  description: string;
  image: string[];
  spots: number;
  currency: string;
  ratingAmount: number;
  totalRatings: number;
}

export interface TripFilter {
  countries: string[];
  startDate: string;
  endDate: string;
  priceMin: number;
  priceMax: number;
  rating: number;
}


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  constructor(private cartService: CartService,
    private tripsService: TripsService,
    private db: Firestore,
    private firestoreService: FirestoreService) {}

  trips: Trip[] = [];
  cart: Trip[] = [];

  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.trips = this.tripsService.getTrips();
    this.cart = this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.cartService.setCart(this.cart);
    this.tripsService.setTrips(this.trips);
  }
  
  filter = {
    countries: [],
    startDate: '',
    endDate: '',
    priceMin: -1,
    priceMax: Infinity,
    rating: 0
  } as TripFilter

  displayTripRating(trip: Trip): number {
    if (trip.ratingAmount > 0) {
      return trip.ratingAmount / trip.totalRatings;
    }
    else return 0;
  }
  
  ratingEvent(trip: Trip, rating: number) {
    trip.ratingAmount += rating;
    trip.totalRatings += 1;
  }

  addClick(trip: Trip) {
    if (trip.spots < trip.maxSpots) {
      trip.spots += 1;
      if (trip.spots == 1) {
        this.cart.push(trip);
      }
    }
  }

  removeClick(trip: Trip) {
    if (trip.spots == 0) {
      const ind = this.cart.indexOf(trip);
      if (ind >= 0) {
        this.cart.splice(ind, 1);
      }
    }
    else {
      trip.spots -= 1;
    }
  }

  getSpots(trips: Trip[]): number {
    let spots = 0;
    for (let trip of trips) {
      spots += trip.spots;
    }
    return spots;
  }

  getCartValue(): number {
    let sum = 0;
    for (let trip of this.cart) {
      sum += trip.price * trip.spots;
    }
    return sum;
  }

  getMaxPriceTrip(trips: Trip[], filter: TripFilter): Trip {
    let max = -1;
    let maxTrip = <Trip>{};
    let tripPipe = new TripsPipe();
    trips = tripPipe.transform(trips, filter);
    for (let trip of trips) {
      if (trip.price > max && trip.maxSpots - trip.spots > 0) {
        max = trip.price;
        maxTrip = trip;
      }
    }
    return maxTrip;
  }

  getMinPriceTrip(trips: Trip[], filter: TripFilter): Trip {
    let min = Infinity;
    let minTrip = <Trip>{};
    let tripPipe = new TripsPipe();
    trips = tripPipe.transform(trips, filter);
    for (let trip of trips) {
      if (trip.price < min && trip.maxSpots - trip.spots > 0) {
        min = trip.price;
        minTrip = trip;
      }
    }
    return minTrip;
  }
  
  deleteTrip(trip: Trip) {
    for (let i = 0; i < this.trips.length; ++i) {
      if (this.trips[i] == trip) {
        this.trips.splice(i, 1)
      }
    }
    this.firestoreService.removeDocById(trip.id); 
  }

  formSubmitHandler(trip: Trip) {
    this.trips.push(trip);
  }

  filterReceiver(filter: TripFilter) {
    this.filter = filter;
  }

  getFilter() {
    return this.filter;
  }
}
