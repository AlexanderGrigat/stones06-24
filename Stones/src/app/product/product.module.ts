import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { UtilsModule } from '../utils/utils.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    UtilsModule,
    MatButtonModule,
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
