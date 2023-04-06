import { createSelector } from '@ngrx/store';
import { IQuestion } from '../models/question.model';
import { AppState, QuestionsState } from '../app-state';

// export const selectQuestions =
//   createFeatureSelector<IQuestion>('questionslist');

export const selectQuestionsState = (state: AppState) => state.questionsState;

export const selectQuestions = createSelector(
  selectQuestionsState,
  (state: QuestionsState) => state.questions
);
