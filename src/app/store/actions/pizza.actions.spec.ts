import * as fromPizza from './pizza.actions';

describe('pizzaPizzas', () => {
  it('should return an action', () => {
    expect(fromPizza.pizzaPizzas().type).toBe('[Pizza] Pizza Pizzas');
  });
});
