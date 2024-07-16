import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../../services/category.service';
import * as CategoriesActions from '../actions/category.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() => this.categoriesService.getCategories()
        .pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoriesActions.loadCategoriesFailure({ error })))
        ))
    )
  );

  constructor(private actions$: Actions, private categoriesService: CategoriesService) {}
}
