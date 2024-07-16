import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs'; // Add this import
import { ProductsState } from '../../../../core/store/reducers/product.reducer';
import * as ProductsActions from '../../../../core/store/actions/product.actions';
import { ProductsService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/store/models/product.model'; // Add this import

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(private store: Store<ProductsState>, private productsService: ProductsService) {
    this.products$ = this.store.select(state => state.products);
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products: Product[]) => {

      this.products$ = of(products);

    });
  }

  deleteProduct(id: number): void {
    this.store.dispatch(ProductsActions.deleteProduct({ id: id }));
  }
}
