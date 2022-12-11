import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Firestore,  collection, getDocs, query, doc, where, orderBy } from '@angular/fire/firestore'
import { Trip } from '../trips/trips.component';
import { TripsService } from '../trips.service';
import { CartService } from '../cart.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Review {
  nickname: string;
  tripName: string;
  review: string;
  date: string;
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  constructor(private route: ActivatedRoute, 
    private db: Firestore,
    private tripsService: TripsService,
    private cartService: CartService) {}
  private subscription: Subscription | undefined;

  id: number = -1;
  trip!: Trip;

  trips: Trip[] = [];
  cart: Trip[] = [];
  reviews: Review[] = [];

  pipe = new DatePipe('en-US');

  async ngOnInit(): Promise<void> {
    this.trips = this.tripsService.getTrips();
    if (this.trips.length == 0) {
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
    this.subscription = this.route.params.subscribe(params => {
      this.id = params["id"];
      for (let trip of this.trips) {
        if (trip.id == this.id) {
          this.trip = trip;
        }
      }
    });
    this.cart = this.cartService.getCart();
    this.tripsService.setTrips(this.trips);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.cartService.setCart(this.cart);
  }

  reviewForm = new FormGroup({
    nickname: new FormControl('', [
      Validators.required
    ]),
    tripName: new FormControl('', [
      Validators.required
    ]),
    review: new FormControl('', [
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500)
    ]),
    date: new FormControl('', [])
  })

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

  submitForm() {
    if (!this.reviewForm.valid) {
      return;
    }

    let newReview = {
      nickname: this.reviewForm.get("nickname")!.value,
      tripName: this.reviewForm.get("tripName")!.value,
      review: this.reviewForm.get("review")!.value,
      date: this.pipe.transform(this.reviewForm.get("date")!.value, "dd.MM.yyyy")
    } as unknown as Review;
    this.reviews.push(newReview);
    this.reviewForm.reset();
  }
}
