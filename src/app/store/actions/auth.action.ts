import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
  '[Login Component] Login',
  props<{ user: User }>()
);
