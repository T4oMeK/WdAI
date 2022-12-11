import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { CartComponent } from './cart/cart.component'
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TripComponent } from './trip/trip.component';
import { TripsHistoryComponent } from './trips-history/trips-history.component';

const routes: Routes = [
  {path: 'wycieczki', component: TripsComponent},
  {path: 'dodaj-wycieczke', component: AddTripComponent},
  {path: 'koszyk', component: CartComponent},
  {path: 'wycieczki/:id', component: TripComponent},
  {path: 'historia-wycieczek', component: TripsHistoryComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
