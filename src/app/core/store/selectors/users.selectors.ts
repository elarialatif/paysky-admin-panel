import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from '../reducers/user.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectUserById = (userId: string) => createSelector(
  selectUsersState,
  (state: UsersState) => state.users.find(user => user.id === userId)
);

export const selectProductsError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);
