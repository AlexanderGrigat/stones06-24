import { Component } from '@angular/core';
import { Product } from './product/product';

@Component({
  selector: 'stn-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){
    console.log("Das ist die App Component")
  }
  title = 'stones';
  //parentProduct = new Product(12, "Granitstein Grabo", 120.50, 12);
  today = new Date();
  

  // onSaveProduct(newProduct: Product) {
  //   this.products.unshift(newProduct);
  // }

  onPriceChanged(price: number) {
    alert('Neuer Preis: ' + price);
  }
}

