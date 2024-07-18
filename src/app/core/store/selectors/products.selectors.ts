import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../reducers/product.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductById = (productId: string) => createSelector(
  selectProductsState,
  (state: ProductsState) => state.products.find(product => product.id === productId)
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);
