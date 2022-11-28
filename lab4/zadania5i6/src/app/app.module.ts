import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Zadanie5Component } from './zadanie5/zadanie5.component';
import { Zadanie6parentComponent } from './zadanie6parent/zadanie6parent.component';
import { Zadanie6childComponent } from './zadanie6child/zadanie6child.component'

@NgModule({
  declarations: [
    AppComponent,
    Zadanie5Component,
    Zadanie6parentComponent,
    Zadanie6childComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
