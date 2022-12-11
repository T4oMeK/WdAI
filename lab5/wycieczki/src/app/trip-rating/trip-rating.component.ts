import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TripRatingComponent implements OnInit {
  @Input('rating') rating = 1;
  @Output() rated = new EventEmitter();

  stars = 5;
  ratingArray: number[] = [];

  constructor() {}
  
  voted = false;

  ngOnInit() {
    for (let i = 0; i < this.stars; ++i) {
      this.ratingArray.push(i);
    }
  }

  ratingEvent(rating: number) {
    if (this.voted) {
      return
    }
    else {
      this.rated.emit(rating);
    }
    this.voted = true;
  }

  starStatus(i: number) {
    if (this.rating >= i + 1) {
      return 'star';
    }
    else {
      return 'star_border';
    }
  }
}
