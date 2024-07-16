import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from '../actions/product.actions';
import { Product } from '../models/product.model';

export interface ProductsState {
  products: Product[];
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({ ...state, products })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, error })),
  on(ProductsActions.addProductSuccess, (state, { product }) => ({ ...state, products: [...state.products, product] })),
  on(ProductsActions.addProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductsActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  on(ProductsActions.updateProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(p => p.id !== id)
  })),
  on(ProductsActions.deleteProductFailure, (state, { error }) => ({ ...state, error }))
);
