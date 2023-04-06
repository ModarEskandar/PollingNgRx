import { Action, createAction, props } from '@ngrx/store';
import { IUser, User } from '../models/user.model';
export enum UserActionType {
  GET_USERS = '[Users Service] Fetch Users',
  GET_USERS_SUCCESS = '[Users Service] Fetch Users Success',
  ADD_USER_ANSWER = '[Poll Question User] Add User Answer',
  ADD_USER_QUES = '[Add Question User] Alter User Question',
}

export const getUsers = createAction(UserActionType.GET_USERS);
export const getUsersSuccess = createAction(
  UserActionType.GET_USERS_SUCCESS,
  props<{ users: IUser }>()
);
export const addUserAnswer = createAction(
  UserActionType.ADD_USER_ANSWER,
  props<{ voterId: string; questionId: string; answerOption: string }>()
);

export const addUserQuestion = createAction(
  UserActionType.ADD_USER_QUES,
  props<{ questionId: string; authorId: string }>()
);
