import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  standalone:true,
  imports: [
    NgClass, ProductComponent, MatCardModule, AsyncPipe, RouterLink
  ],
  selector: 'stn-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products = inject(ProductService).getList();
}