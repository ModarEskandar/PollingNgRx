import { createReducer, on } from '@ngrx/store';
import { login } from '../actions/auth.action';
import { User } from '../models/user.model';

export const initialState: User = {
  id: '',
  name: '',
  avatarURL: '',
  answers: {},
  questions: [],
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => user)
);
