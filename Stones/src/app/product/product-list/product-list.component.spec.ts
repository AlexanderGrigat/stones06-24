import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductComponent } from '../product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../utils/utils.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule, provideRouter } from '@angular/router';
import { MockProductService, ProductService } from '../product.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductComponent], 
      imports:[UtilsModule, RouterModule],
      providers:[{provide: ProductService, useClass: MockProductService},provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should correctly read product list', () => {
    expect(component.products[0].id).toBe(-1);
  });
});
