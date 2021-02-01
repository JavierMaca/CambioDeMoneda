import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild('formulario', {static: true}) formulario: NgForm;
  public formularioUsuario: FormGroup;

  datos: any[] = [];
  resultado = 0;
  bandera = false;
  maxDate: Date = new Date();
  dat: any;


  constructor(private dataService: DataService,
              private fb: FormBuilder) {
              }

  ngOnInit(): void {
   this.crearFormulario();
   this.mostrar();
   this.mostrar2();
  }

  // tslint:disable-next-line: typedef
  mostrar(){
    this.dataService.getDatos()
    .subscribe((observer: any[]) => {
      this.datos = observer;
      console.log(this.datos);
    }
    );
  }

  // tslint:disable-next-line: typedef
  mostrar2(){
    this.dataService.getDate()
    .subscribe((datoss: any) => {
      console.log(datoss);
      this.dat = new Date (datoss.date).getFullYear() + ' ' + datoss.base;
      console.log(this.dat);
    } );
  }


  // tslint:disable-next-line: typedef
  calcular(){
    if (this.formularioUsuario.valid){
      this.bandera = true;

      let fecha = this.formularioUsuario.get('fecha').value;
      console.log(fecha);

      let date = new Date(fecha);
      const month = date.getMonth() + 1;
      let dateFull = date.getFullYear() + '-' + month + '-' + date.getDate();
      console.log(dateFull);

      let euro = this.formularioUsuario.get('euro').value;
      let moneda = this.formularioUsuario.get('moneda').value;

      this.dataService.getCurrencyConverter(moneda, dateFull)
      .subscribe(observer => {
        const resul = Object.values(observer.rates);
        // this.resultado = euro * parseFloat(resul[0]);
        this.resultado = euro * resul[0];
        this.formularioUsuario.get('resultado').setValue(this.resultado);
        this.bandera = false;
        console.log(this.resultado);
      }
      );
    }
  }

  // tslint:disable-next-line: typedef
  public crearFormulario(): void{
    this.formularioUsuario = this.fb.group({
      fecha: [new Date(), [Validators.required]],
      euro: [null, [Validators.required, Validators.min(1)]],
      moneda: [null, Validators.required],
      resultado: [{value: 0, disabled: true}]
    });
  }



}
