import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from '../reducers/category.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesState>('categories');

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.categories
);
