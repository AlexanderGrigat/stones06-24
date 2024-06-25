import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'stn-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  @Output() priceChange = new EventEmitter<number>();

  showPrice = true;
  styleConfig: any = {
    'border-style': 'dashed',
  }

  raisePrice(){
    this.product.price += 5;
    this.priceChange.emit(this.product.price);
  }

  togglePrice() {
    this.showPrice = !this.showPrice;
  }

  changePrice(price: number): void{
    this.product.price = price;
  }
}
