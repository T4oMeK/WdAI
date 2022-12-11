import { Component, OnInit } from '@angular/core';
import { TripsHistoryService } from '../trips-history.service';

export interface HistoricTrip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  country: string;
  spots: number;
  status: string;
}

@Component({
  selector: 'app-trips-history',
  templateUrl: './trips-history.component.html',
  styleUrls: ['./trips-history.component.css']
})
export class TripsHistoryComponent implements OnInit {
  constructor(private tripsHistoryService: TripsHistoryService) {}

  history: HistoricTrip[] = [];
  statuses: string[] = ["przed", "w trakcie", "zakończona"];
  selectedStatus: string = '';

  ngOnInit(): void {
    this.history = this.tripsHistoryService.getHistory();
    this.history.forEach((trip) => {
      this.getStatus(trip);
    })
  }

  getStatus(trip: HistoricTrip) {
    let today = new Date();
    let startArray = trip.startDate.split('.')
    let start = new Date(Number(startArray[2]), Number(startArray[1]) - 1, Number(startArray[0]));
    let endArray = trip.endDate.split('.')
    let end = new Date(Number(endArray[2]), Number(endArray[1]) - 1, Number(endArray[0]));

    if (today < start) {
      trip.status = "przed"
    }
    else if (today > start && today < end) {
      trip.status = "w trakcie"
    }
    else {
      trip.status = "zakończona"
    }
  }

  getFilteredHistory(status: string): HistoricTrip[] {
    console.log(this.selectedStatus);
    if (status !== '' && status !== undefined) {
      return this.history.filter(item => item.status === status);
    }
    else {
      return this.history;
    }
  }
}
