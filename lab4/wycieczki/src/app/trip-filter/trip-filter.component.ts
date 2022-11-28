import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Trip, TripFilter} from '../trips/trips.component'
import { DatePipe } from '@angular/common'
import { TripsPipe } from '../trips/trips-filter.pipe'

@Component({
  selector: 'app-trip-filter',
  templateUrl: './trip-filter.component.html',
  styleUrls: ['./trip-filter.component.css']
})
export class TripFilterComponent implements OnInit {

  @Input('trips') trips: Trip[] = []; 

  @Output() emitFilter = new EventEmitter();

  constructior() {}

  ngOnInit(): void {
    this.changedFilter();
  }
  
  countriesArray: string[] = [];
  minPrice: number = -1;
  maxPrice: number = Infinity;
  startDate: string = '';
  endDate: string = '';
  rating: number = 0;

  filterTemplate = {
    countries: [],
    priceMin: -1,
    priceMax: Infinity,
    startDate: '',
    endDate: '',
    rating: 0
  } as TripFilter

  pipe = new DatePipe('en-US');

  allCountries() {
    return this.trips.map(item => item.country)
    .filter((value, index, self) => self.indexOf(value) === index);
  }

  countries() {
    let countries = this.allCountries()
    let filter = this.filterTemplate;
    filter.countries = countries;
    let tripPipe = new TripsPipe();
    let trips = tripPipe.transform(this.trips, filter)
    return trips.map(item => item.country)
    .filter((value, index, self) => self.indexOf(value) === index);
  }

  getMaxPrice(trips: Trip[]): number {
    let max = -1;
    if (this.countriesArray.length == 0) {
      for (let trip of trips) {
        if (trip.price > max) {
          max = trip.price;
        }
      }
      return max;
    }
    else {
      let filter = this.filterTemplate;
      filter.countries = this.countriesArray;
      let tripPipe = new TripsPipe();
      trips = tripPipe.transform(trips, filter)
      for (let trip of trips) {
        if (trip.price > max) {
          max = trip.price;
        }
      }
      return max;
    }
  }

  getMinPrice(trips: Trip[]): number {
    let min = Infinity;
    if (this.countriesArray.length == 0) {
      for (let trip of trips) {
        if (trip.price < min) {
          min = trip.price;
        }
      }
      return min;
    }
    else {
      let filter = this.filterTemplate;
      filter.countries = this.countriesArray;
      let tripPipe = new TripsPipe();
      trips = tripPipe.transform(trips, filter)
      for (let trip of trips) {
        if (trip.price < min) {
          min = trip.price;
        }
      }
      return min;
    }
  }

  changedFilter() {
    let filter = {
      countries: this.countriesArray,
      startDate: this.startDate,
      endDate: this.endDate,
      priceMin: this.minPrice,
      priceMax: this.maxPrice,
      rating: this.rating
    } as TripFilter

    this.emitFilter.emit(filter);
  }
}
