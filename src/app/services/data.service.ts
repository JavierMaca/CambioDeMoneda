import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService{

  private REST_API_CURRENCY = 'https://api.exchangeratesapi.io/';

  constructor(private http: HttpClient){
    console.log('servicio listo!!!');
  }

   // tslint:disable-next-line: typedef
   getDatos(){
    const datosArray: DatosModelo[] = [];
    // return this.http.get(this.REST_API_CURRENCY + 'latest')
    return this.http.get<DatosModelo[]>(`${this.REST_API_CURRENCY}latest`)
    .pipe(map((datos: DatosModelo[]) => {
      const keys = Object.keys(datos.rates);
      const values = Object.values(datos.rates);

      for (let i = 0; i < keys.length; i++) {
        datosArray.push(
          {
            key: keys[i],
            value: values[i]
          });
    }
      return datosArray;
    })
  );
  }

  // tslint:disable-next-line: typedef
  getDate() {
    return this.http.get('https://api.exchangeratesapi.io/latest')
    .pipe(map((dato: any) => ({
       date: dato.date,
       base: dato.base
    })
    ));
  }

  // tslint:disable-next-line: typedef
  getCurrencyConverter(base: string, date: string) {
    // return this.http.get(this.REST_API_CURRENCY + date + '?base=EUR&symbols=' + base);
    return this.http.get(`${this.REST_API_CURRENCY}${date}?base=EUR&symbols=${base}`);
  }

  } // fin class

export interface DatosModelo
    {
      key: string;
      value: number;
    }
