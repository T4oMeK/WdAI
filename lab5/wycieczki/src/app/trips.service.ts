import { Injectable } from '@angular/core';
import { Trip } from './trips/trips.component';
import { Firestore, collectionData, collection, getDocs, query, orderBy } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private db: Firestore) { 
    this.createTrips();
  }
  
  trips: Trip[] = []

  async createTrips(): Promise<void> {
    const q = query(collection(this.db, "Wycieczki"), orderBy('id'));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data_ = doc.data();
      this.trips.push({
        id: data_['id'],
        name: data_['name'],
        country: data_['country'],
        startDate: data_['startDate'],
        endDate: data_['endDate'],
        price: data_['price'],
        maxSpots: data_['maxSpots'],
        description: data_['description'],
        image: data_['img'],
        spots: 0,
        currency: "zł",
        ratingAmount: 0,
        totalRatings: 0
      } as Trip)
    });
  }

  getTrip(id: number): Trip {
    let t = {
      id: '',
      name: '',
      country: '',
      startDate: '',
      endDate: '',
      price: 0,
      maxSpots: 0,
      description: '',
      image: [],
      spots: 0,
      currency: '',
      ratingAmount: 0,
      totalRatings: 0
    } as unknown as Trip
    for (let trip of this.trips) {
      if (id == trip.id) {
        t = trip;
      }
    }
    return t;
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
  }

  setTrips(trips: Trip[]){
    this.trips = trips;
  }

  getTrips(): Trip[]{
    return this.trips
  }
}