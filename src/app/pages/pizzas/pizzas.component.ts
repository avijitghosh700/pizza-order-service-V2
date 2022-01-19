import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Pizza } from 'src/app/helpers';
import { loadPizzas, PizzaState, State } from 'src/app/store';
import * as fromReduders from 'src/app/store/reducers';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public state: State | null = null;
  public pizzaState: PizzaState | null = null;
  public $pizzas: Observable<Pizza[]> = this.store.select(fromReduders.selectPizzas);

  constructor(public store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPizzas());
  }

  // getState() {
  //   this.store.select(fromReduders.selectStore).subscribe({
  //     next: (res) => {
  //       if (res && Object.keys(res).length) {
  //         this.state = res;
  //         this.pizzaState = res?.pizzas;
  //       }
  //     }
  //   });
  // }
}
