import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zadanie5',
  templateUrl: './zadanie5.component.html',
  styleUrls: ['./zadanie5.component.css']
})
export class Zadanie5Component implements OnInit {
  constructor() {}

  selectedBrand!: string;
  selectedModel!: string;
  selectedColor!: string;
  cars: any;
  colorChoice: string[] | undefined;

  showBrand = false;
  showModels = false;
  showColors = false;
  showCar = false;

  ngOnInit(): void {
    fetch('../assets/car-list.json').then(res => res.json())
    .then(json => {
      this.cars = json;
      this.showBrand = true;
    });
  }

  chosenBrand() {
    this.showModels = true;
    this.showCar = false;
    this.showColors = false;
  }

  chosenModel() {
    this.showColors = true;
    this.colorChoice = this.cars[this.selectedBrand][this.selectedModel];
    this.showCar = false;
  }

  chosenColor() {
    this.showCar = true;
  }
}
