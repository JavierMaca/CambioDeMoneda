import { Component, OnInit } from '@angular/core';
import * as EventEmitter from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public titleT: string;

  // tslint:disable-next-line: typedef
  ngOnInit(){
    this.titleT = 'informacion de monedas';
  }
}
