import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from '../actions/category.actions';
import { Category } from '../models/category.model';

export interface CategoriesState {
  categories: Category[];
  error: any;
}

export const initialState: CategoriesState = {
  categories: [],
  error: null
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({ ...state, error })),
  on(CategoriesActions.addCategorySuccess, (state, { category }) => ({ ...state, categories: [...state.categories, category] })),
  on(CategoriesActions.addCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(CategoriesActions.updateCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.map(c => c.id === category.id ? category : c)
  })),
  on(CategoriesActions.updateCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(CategoriesActions.deleteCategorySuccess, (state, { id }) => ({
    ...state,
    categories: state.categories.filter(c => c.id !== id)
  })),
  on(CategoriesActions.deleteCategoryFailure, (state, { error }) => ({ ...state, error }))
);
