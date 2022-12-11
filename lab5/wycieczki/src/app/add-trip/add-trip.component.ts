import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Trip } from '../trips/trips.component'
import { FirestoreService } from '../firestore.service';
import { TripsService } from '../trips.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {
  constructor(private firestoreService: FirestoreService,
    private tripsService: TripsService) {}

  ngOnInit(): void {
    
  }

  @Output() formSubmit = new EventEmitter<Trip>();

  addTripForm = new FormGroup({
    tripName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    tripCountry: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    tripStartDate: new FormControl(new Date(), [
      Validators.required
    ]),
    tripEndDate: new FormControl(new Date(), [
      Validators.required
    ]),
    tripPrice: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    tripMaxSpots: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    tripDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    tripImage: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });

  wrong = false;
  correct = false;

  today = new Date();
  pipe = new DatePipe('en-US');

  submitForm() {
    if (!this.addTripForm.valid) {
      this.wrong = true;
      return;
    }

    let newTrip = {
      name: this.addTripForm.get('tripName')!.value,
      country: this.addTripForm.get('tripCountry')!.value,
      startDate: this.pipe.transform(this.addTripForm.get('tripStartDate')!.value, 'dd.MM.yyyy'),
      endDate: this.pipe.transform(this.addTripForm.get('tripEndDate')!.value, 'dd.MM.yyyy'),
      price: this.addTripForm.get('tripPrice')!.value,
      maxSpots: this.addTripForm.get('tripMaxSpots')!.value,
      description: this.addTripForm.get('tripDescription')!.value,
      image: this.addTripForm.get('tripImage')!.value,
      spots: 0,
      currency: 'zł',
      ratingAmount: 0,
      totalRatings: 0
    } as unknown as Trip;
    this.formSubmit.emit(newTrip);
    this.wrong = false;
    this.correct = true;
    this.firestoreService.addDocTrip(newTrip);
    this.tripsService.addTrip(newTrip);
    this.addTripForm.reset();
  }
}
