import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'stn-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() saveProduct = new EventEmitter<Product>();

  // productForm = new FormGroup({
  //   name: new FormControl(),
  //   price: new FormControl(),
  //   weight: new FormControl(),
  // });

  private fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: [''],
    price: [0],
    weight: [0],
  });

  save() {
    const formValue = this.productForm.value;
    if (formValue.name && formValue.price && formValue.weight) {
      const product = new Product(
        -1,
        formValue.name,
        formValue.price,
        formValue.weight
      );

      this.saveProduct.emit(product);
      this.productForm.reset();
    }
  }
}
