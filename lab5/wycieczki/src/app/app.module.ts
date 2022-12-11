import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripsPipe } from './trips/trips-filter.pipe';
import { TripFilterComponent } from './trip-filter/trip-filter.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TripComponent } from './trip/trip.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TripsHistoryComponent } from './trips-history/trips-history.component'

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    AddTripComponent,
    TripRatingComponent,
    TripsPipe,
    TripFilterComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    PagenotfoundComponent,
    TripComponent,
    TripsHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    NgbModule
  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'pl-PL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
