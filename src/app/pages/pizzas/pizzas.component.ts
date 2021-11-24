import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/helpers';
import { PizzaService } from 'src/app/services/pizza/pizza.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public pizzas:Pizza[] = [];

  constructor(public pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.getPizzas();
  }

  getPizzas() {
    this.pizzaService.getPizzas().subscribe({
      next: (res) => {
        this.pizzas = res['pizza'];
        console.log(this.pizzas);
      }
    });
  }
}
