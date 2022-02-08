import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzasComponent } from './pages/pizzas/pizzas.component';
import { CheckoutGuard } from './shared/guards/checkout.guard';

const routes: Routes = [
  {
    path: '',
    component: PizzasComponent,
  },
  {
    path: 'checkout',
    canActivate: [CheckoutGuard],
    loadChildren: () => import('./pages/checkout/checkout.module').then((module) => module.CheckoutModule),
  },
  // {
  //   path: '**',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
