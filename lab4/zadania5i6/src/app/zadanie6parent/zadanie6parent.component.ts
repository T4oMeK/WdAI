import { Component } from '@angular/core';

@Component({
  selector: 'app-zadanie6parent',
  templateUrl: './zadanie6parent.component.html',
  styleUrls: ['./zadanie6parent.component.css']
})
export class Zadanie6parentComponent {

  htmlFromChild: string = '';

  parentEventHandler(emitted: string){
    this.htmlFromChild = emitted;
  }
}
