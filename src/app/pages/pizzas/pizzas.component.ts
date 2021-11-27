import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Pizza } from 'src/app/helpers';
import { PizzaService } from 'src/app/services/pizza/pizza.service';
import { loadPizzas, loadPizzasFailure, loadPizzasSuccess, State } from 'src/app/store';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public pizzas:Pizza[] = [];

  constructor(
    public pizzaService: PizzaService,
    public store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getPizzas();
  }

  getPizzas() {
    this.store.dispatch(loadPizzas());
    this.pizzaService.getPizzas().subscribe({
      next: (res) => {
        this.pizzas = res['pizza'];
        this.store.dispatch(loadPizzasSuccess({ payload: this.pizzas }));
        console.log(this.pizzas);
      },
      error: (error) => { this.store.dispatch(loadPizzasFailure({ error: error })); }
    });
  }
}
