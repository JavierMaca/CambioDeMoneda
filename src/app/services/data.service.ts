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
   getDatos() {
    const arr: any[] = [];
    return this.http.get(this.REST_API_CURRENCY + 'latest').pipe(
      map(response => {
        // const keys = Object.keys(response.rates);
        // const values = Object.values(response.rates);
        let keys = Object.keys(response.rates);
        let values = Object.values(response.rates);

        for (let i = 0; i < keys.length; i++) {
          // console.log(keys[i], values[i]);
          arr.push({
            id : keys[i],
            value : values[i]
          });
        }
        return arr;
      })
    );
  }

  // tslint:disable-next-line: typedef
  getCurrencyConverter(base: string, date: string) {
    return this.http.get(this.REST_API_CURRENCY + date + '?base=EUR&symbols=' + base);
  }

  } // fin class
