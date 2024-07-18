import { createReducer, on } from '@ngrx/store';
import * as UserssActions from '../actions/user.actions';
import { User } from '../models/user.model';

export interface UsersState {
  users: User[];
  error: any;
}

export const initialState: UsersState = {
  users: [],
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UserssActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserssActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UserssActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UserssActions.addUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserssActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(c => c.id === user.id ? user : c)
  })),
  on(UserssActions.updateUserFailure, (state, { error }) => ({ ...state, error })),
  on(UserssActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(c => c.id !== id)
  })),
  on(UserssActions.deleteUserFailure, (state, { error }) => ({ ...state, error }))
);
