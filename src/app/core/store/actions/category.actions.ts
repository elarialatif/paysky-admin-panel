import { createAction, props } from '@ngrx/store';
import { Category } from '../models/category.model';

export const loadCategories = createAction('[Categories] Load Categories');
export const loadCategoriesSuccess = createAction('[Categories] Load Categories Success', props<{ categories: Category[] }>());
export const loadCategoriesFailure = createAction('[Categories] Load Categories Failure', props<{ error: any }>());

export const addCategory = createAction('[Categories] Add Category', props<{ category: Category }>());
export const addCategorySuccess = createAction('[Categories] Add Category Success', props<{ category: Category }>());
export const addCategoryFailure = createAction('[Categories] Add Category Failure', props<{ error: any }>());

export const updateCategory = createAction('[Categories] Update Category', props<{ category: Category }>());
export const updateCategorySuccess = createAction('[Categories] Update Category Success', props<{ category: Category }>());
export const updateCategoryFailure = createAction('[Categories] Update Category Failure', props<{ error: any }>());

export const deleteCategory = createAction('[Categories] Delete Category', props<{ id: number }>());
export const deleteCategorySuccess = createAction('[Categories] Delete Category Success', props<{ id: number }>());
export const deleteCategoryFailure = createAction('[Categories] Delete Category Failure', props<{ error: any }>());
