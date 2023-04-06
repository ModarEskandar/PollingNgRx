import { IUser, User } from '../store/models/user.model';
import { IQuestion } from '../store/models/question.model';

export interface QuestionsState {
  questions: IQuestion;
  isLoadingQuestions: boolean;
}

export interface UsersState {
  users: IUser;
  isLoadingUsers: boolean;
}

export interface AppState {
  questionsState: QuestionsState;
  usersState: UsersState;
  authState: User;
}
