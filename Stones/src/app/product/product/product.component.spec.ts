import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { Product } from '../product';
import { By } from '@angular/platform-browser';
import { NettoPipe } from '../../utils/netto.pipe';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     imports: [ProductComponent, NettoPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = new Product(1,'Teststein', 2,5)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should correctly show name in DOM', () => {
    const liName = fixture.debugElement.query(By.css('#name'));

    expect(liName.nativeElement.textContent).toContain(component.product.name);
  });
  
  it('raisePrice should raise price by 5', () => {
    const oldPrice = component.product.price;

    component.raisePrice();

    expect(component.product.price).toBe(oldPrice + 5);
  });
});
