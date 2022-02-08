import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzasComponent } from './pages/pizzas/pizzas.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { CartPreviewComponent } from './components/cart-preview/cart-preview.component';
import { QtySelectorComponent } from './components/qty-selector/qty-selector.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PizzaEffect } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    PizzasComponent,
    PizzaCardComponent,
    CartPreviewComponent,
    QtySelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([PizzaEffect]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
