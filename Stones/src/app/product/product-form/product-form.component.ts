import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../product';
import { CustomValidators } from '../../utils/validators/custom-validators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { map, pipe } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
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
  reverseName = '';
  nameLength = 0;

  private productService = inject(ProductService);

  private fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: ['', [Validators.required, CustomValidators.alphaNum]],
    price: [0, [Validators.required, CustomValidators.positiv]],
    weight: [0, Validators.required],
  });
  id = -1;

  constructor(
  ) {
    inject(ActivatedRoute).paramMap.subscribe(paramMap => {
      const idParam = paramMap.get('id');
      if (idParam) {
        this.id = +idParam;
      } 
    })

    this.productForm.controls.name.valueChanges.pipe(
      map(n => n!.split('').reverse().join('')))
      .subscribe(
        value => this.reverseName = value);

    this.productForm.controls.name.valueChanges.subscribe((value) => {
      this.nameLength = value ? value.length : 0;
    });
  }

  save() {
    const formValue = this.productForm.value;
    if (
      this.productForm.valid &&
       formValue.name && 
       formValue.price &&
        formValue.weight
      ) {
      const product = {
        name: formValue.name,
        price: formValue.price,
        weight: formValue.weight
      };

      this.productService.newProduct(product).subscribe();
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
 