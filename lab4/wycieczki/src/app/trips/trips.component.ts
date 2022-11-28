import { Component, OnInit } from '@angular/core';
import { TripsPipe } from './trips-filter.pipe';

export interface Trip {
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  price: number;
  maxSpots: number;
  description: string;
  image: string;
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
  constructor() {}

  trips: Trip[] = [];

  ngOnInit(): void {
    fetch('./assets/trips.json').then(res => res.json())
    .then(json => {
      for (let trip in json["trips"]) {
        this.trips.push({
          name: json["trips"][trip]["name"],
          country: json["trips"][trip]["country"],
          startDate: json["trips"][trip]["start-date"],
          endDate: json["trips"][trip]["end-date"],
          price: json["trips"][trip]["price"],
          maxSpots: json["trips"][trip]["max-spots"],
          description: json["trips"][trip]["description"],
          image: json["trips"][trip]["img"],
          spots: 0,
          currency: 'zł',
          ratingAmount: 0,
          totalRatings: 0
        } as Trip)
      }
    });
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
    else return 1;
  }
  
  ratingEvent(trip: Trip, rating: number) {
    trip.ratingAmount += rating;
    trip.totalRatings += 1;
  }

  addClick(trip: Trip) {
    if (trip.spots < trip.maxSpots) {
      trip.spots += 1;
    }
  }

  removeClick(trip: Trip) {
    if (trip.spots > 0) {
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
