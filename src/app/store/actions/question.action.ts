import { Action, createAction, props } from '@ngrx/store';
import { IQuestion, Question } from '../models/question.model';
export enum QuestionActionType {
  GET_QUESTIONS = '[Questions Service] Fetch Questions',
  GET_QUESTIONS_SUCCESS = '[Questions Service] Fetch Questions Success',
  ADD_QUES = '[Add Question] Add Question',
  ALT_QUES = '[Poll Question] Alter Question',
}

export const getQuestions = createAction(QuestionActionType.GET_QUESTIONS);
export const getQuestionsSuccess = createAction(
  QuestionActionType.GET_QUESTIONS_SUCCESS,
  props<{ allQuestions: IQuestion }>()
);
export const addQuestion = createAction(
  QuestionActionType.ADD_QUES,
  props<{ question: Question; authorId: string }>()
);

export const alterQuestion = createAction(
  QuestionActionType.ALT_QUES,
  props<{ questionId: string; voterId: string; answerOption: number }>()
);
