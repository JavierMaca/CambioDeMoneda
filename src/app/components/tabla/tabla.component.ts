import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService, DatosModelo } from '../../services/data.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  datosT: DatosModelo[] = [];
  headerColumns: string[] = ['nombre', 'valor'];

  @Input() titleTabla: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.datosTabla();
  }
  // tslint:disable-next-line: typedef
  datosTabla(){
    this.dataService.getDatos()
    .subscribe(observer =>
      {
        this.datosT = observer;
        console.log(this.datosT);
      }
      );
    }

}
