import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app-state";
import { authReducer } from "./reducers/auth.reducer";
import { questionReducer } from "./reducers/question.reducer";
import { usersReducer } from "./reducers/user.reducer";

export const appStateReducers: ActionReducerMap<AppState> = {
    usersState: usersReducer,
    questionsState: questionReducer,
    authState: authReducer
  };