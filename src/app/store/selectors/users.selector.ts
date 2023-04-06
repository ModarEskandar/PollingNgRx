import { createSelector } from '@ngrx/store';
import { AppState, UsersState } from '../app-state';

export const selectUsersState = (state: AppState) => state.usersState;

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);
