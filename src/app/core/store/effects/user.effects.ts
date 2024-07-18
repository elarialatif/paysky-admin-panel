import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/user.service';
import * as UsersActions from './../actions/user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() => this.usersService.getUsers()
        .pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        ))
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
