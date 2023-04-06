import {
  UserActionType,
  addUserAnswer,
  addUserQuestion,
} from '../actions/user.action';
import { UsersState } from '../app-state';
import { createReducer, on } from '@ngrx/store';
import { getUsersSuccess } from './../actions/user.action';
import { IUser } from '../models/user.model';

export const initialState: UsersState = {
  users: {},
  isLoadingUsers: false,
};

export const usersReducer = createReducer(
  initialState,
  on(getUsersSuccess, (state, { users }) => {
    console.log('users', state);
    return {
      ...state,
      users: users,
      isLoadingUsers: false,
    };
  }),
  on(addUserAnswer, (state, payload) => {
    let newUsers: IUser = {
      ...state.users,
      [payload.voterId]: {
        ...state.users[payload.voterId],
        answers: {
          ...state.users[payload.voterId].answers,
          [payload.questionId]: payload.answerOption,
        },
      },
    };

    // newUsers[payload.voterId].answers = {
    //   ...state.users[payload.voterId].answers,
    //   [payload.questionId]: payload.answerOption,
    // };
    return {
      ...state,
      users: newUsers,
    };
  }),

  on(addUserQuestion, (state, payload) => {
    let newUsers: IUser = {
      ...state.users,
      [payload.authorId]: {
        ...state.users[payload.authorId],
        questions: state.users[payload.authorId].questions.concat([
          payload.questionId,
        ]),
      },
    };

    return {
      ...state,
      users: newUsers,
    };
  })
);
