import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzasComponent } from './pages/pizzas/pizzas.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzasComponent,
    PizzaCardComponent,
    CartPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
