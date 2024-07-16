import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);
