import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsState } from '../../../../core/store/reducers/product.reducer';
import * as ProductsActions from '../../../../core/store/actions/product.actions';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEdit = false;
  productId: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<ProductsState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.productId = +params['id'];
        // Load the product details and set the form values
        this.store.select(state => state.products).subscribe(products => {
          const product = products.find(p => p.id === this.productId);
          if (product) {
            this.productForm.setValue({
              title: product.title,
              description: product.description,
              price: product.price,
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.isEdit && this.productId !== null) {
        const updatedProduct = { ...this.productForm.value, id: this.productId };
        this.store.dispatch(ProductsActions.updateProduct({ product: updatedProduct }));
      } else {
        this.store.dispatch(ProductsActions.addProduct({ product: this.productForm.value }));
      }
      this.router.navigate(['/products']);
    }
  }
}
