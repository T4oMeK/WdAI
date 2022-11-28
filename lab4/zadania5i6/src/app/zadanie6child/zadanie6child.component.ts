import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-zadanie6child',
  templateUrl: './zadanie6child.component.html',
  styleUrls: ['./zadanie6child.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Zadanie6childComponent implements OnInit {

  @Output()
  buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor () {}

  ngOnInit(): void {
  }

  clickButtonBasics() {
    this.buttonClicked.emit("<header>The Basics</header><article>Angular is a development platform, built on TypeScript.</article>")
  }

  clickButtonComponents() {
    this.buttonClicked.emit("<header>Components</header><article>With components, you can split logic (and markup) into separate building blocks and then combine those building blocks (and re-use them) to build powerful user interfaces.</article>")
  }

  clickButtonEvents() {
    this.buttonClicked.emit("<header>Events</header><article>Events allow you to trigger code on demand!</article>")
  }
}
