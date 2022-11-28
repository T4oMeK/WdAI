import { Pipe, PipeTransform } from '@angular/core'
import { Trip } from './trips.component'
import { TripFilter } from './trips.component'

@Pipe({
    name: 'filterTrips',
    pure: false
})
export class TripsPipe implements PipeTransform {
    convertDate(dateString: string) {
        let date = dateString.split('.');
        return new Date(date[1] + '/' + date[0] + '/' + date[2]);
    }

    transform(trips: Trip[], filter: TripFilter): Trip[] {
        if (!trips || !filter) {
            return trips
        }
        return trips.filter(trip => {
            return ((filter.countries.length === 0 ? true : filter.countries.some((item) => { return trip.country.toLowerCase().includes(item.toLowerCase()) })) &&
            trip.price >= filter.priceMin && trip.price <= filter.priceMax &&
            (trip.totalRatings === 0 ? 1 >= filter.rating : trip.ratingAmount / trip.totalRatings >= filter.rating) &&
            ((filter.startDate === null || filter.startDate === '') ? true : new Date(filter.startDate) <= this.convertDate(trip.startDate)) && 
            ((filter.endDate === null || filter.endDate === '') ? true : new Date(filter.endDate) >= this.convertDate(trip.startDate)));
        });
    }
}