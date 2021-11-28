import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Pizza } from 'src/app/helpers';
import { PizzaService } from 'src/app/services/pizza/pizza.service';
import { loadPizzas, loadPizzasFailure, loadPizzasSuccess, PizzaState, State } from 'src/app/store';
import * as fromReduders from 'src/app/store/reducers';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public state: State | null = null;
  public pizzaState: PizzaState | null = null;
  public pizzas: Pizza[] = [];

  constructor(
    public pizzaService: PizzaService,
    public store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getPizzas();
    this.getState();
  }

  getPizzas() {
    this.store.dispatch(loadPizzas());

    this.pizzaService.getPizzas().subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          const pizzas = <Pizza[]>res['pizza'].map((item: Pizza) => ({ ...item, orders: { count: 0, price: 0 } })); // Mapping order property
          this.store.dispatch(loadPizzasSuccess({ payload: pizzas }));
        }
      },
      error: (error) => { this.store.dispatch(loadPizzasFailure({ error })); }
    });
  }

  getState() {
    this.store.select(fromReduders.selectStore).subscribe({
      next: (res) => {
        if (res && Object.keys(res).length) {
          this.state = res;
          this.pizzaState = res?.pizzas;
          this.pizzas = this.pizzaState?.data;
        }
      }
    });
  }
}
