import { Injectable } from '@angular/core';
import { HistoricTrip } from './trips-history/trips-history.component';
import { Trip } from './trips/trips.component';

@Injectable({
  providedIn: 'root'
})
export class TripsHistoryService {

  constructor() { }

  trips: HistoricTrip[] = []

  getHistory(): HistoricTrip[] {
    return this.trips;
  }

  addToHistory(trip: Trip) {
    this.trips.push({
        id: trip.id,
        name: trip.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        price: trip.price,
        currency: trip.currency,
        country: trip.country,
        spots: trip.spots,
        status: ''
    } as HistoricTrip)
  }

  sevenDays(): boolean {
    let today = new Date();
    let bul = false;
    this.trips.forEach((trip) => {
      let startArray = trip.startDate.split('.')
      let start = new Date(Number(startArray[2]), Number(startArray[1]) - 1, Number(startArray[0]));
      if (((start.getTime() - today.getTime()) / (1000*3600*24)) < 7) {
        bul = true;
      }
  });
  return bul;
  }
}