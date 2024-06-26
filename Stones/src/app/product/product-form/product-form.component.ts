import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { CustomValidators } from '../../utils/validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'stn-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  // productForm = new FormGroup({
  //   name: new FormControl(),
  //   price: new FormControl(),
  //   weight: new FormControl(),
  // });

  private fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: ['', [Validators.required, CustomValidators.alphaNum]],
    price: [0, [Validators.required, CustomValidators.positiv]],
    weight: [0, Validators.required],
  });
  id = -1;

  private productService = inject(ProductService);

  constructor(
  ) {
    inject(ActivatedRoute).paramMap.subscribe(paramMap => {
      const idParam = paramMap.get('id');
      if (idParam) {
        this.id = +idParam;
      } 
    })
  }

  save() {
    const formValue = this.productForm.value;
    if (
      this.productForm.valid &&
       formValue.name && 
       formValue.price &&
        formValue.weight
      ) {
      const product = new Product(
        this.id,
        formValue.name,
        formValue.price,
        formValue.weight
      );

      this.productService.newProduct(product);
      this.productForm.reset();
    }
  }

  hasSaved() {
    const formValue = this.productForm.value;
    if(!formValue.name && !formValue.price && formValue.weight) {
      return true;
    } else {
      return confirm('Du hast ungespeicherte Daten, willst du wirklich weg?');
    }
  }
}
 