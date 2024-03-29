import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) { }

  getPizzas(): Observable<Record<string, any>> {
    return this.http.get(`${environment.api}/pizza.json`).pipe(delay(1000));
  }
}
