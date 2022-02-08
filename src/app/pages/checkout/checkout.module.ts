import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutMainComponent } from './main/main.component';
import { SuccessComponent } from './success/success.component';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    CheckoutMainComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    StoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutModule { }
