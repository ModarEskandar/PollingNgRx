// import the interface
import { IQuestion, Question } from '../models/question.model';
import * as QuestionActions from '../actions/question.action';
import { createReducer, on } from '@ngrx/store';
import { QuestionsState } from '../app-state';
//create a dummy initial state
const initialState: QuestionsState = {
  questions: {},
  isLoadingQuestions: false,
};

export const questionReducer = createReducer(
  initialState,
  on(QuestionActions.getQuestionsSuccess, (state, { allQuestions }) => {
    return {
      ...state,
      questions: allQuestions,
      isLoadingQuestions: false,
    };
  }),
  on(QuestionActions.addQuestion, (state, payload) => {
    let newQuestions: IQuestion = {
      ...state.questions,
      [payload.question.id]: payload.question,
    };
    return {
      ...state,
      questions: newQuestions,
    };
  }),

  on(QuestionActions.alterQuestion, (state, payload) => {
    let newQuestions: IQuestion;
    if (payload.answerOption === 0) {
      newQuestions = {
        ...state.questions,
        [payload.questionId]: {
          ...state.questions[payload.questionId],
          optionOne: {
            ...state.questions[payload.questionId].optionOne,
            votes: state.questions[payload.questionId].optionOne.votes.concat(
              payload.voterId
            ),
          },
        },
      };
      // newQuestions[payload.questionId].optionOne.votes.concat([
      //   payload.voterId,
      // ]);
    } else {
      newQuestions = {
        ...state.questions,
        [payload.questionId]: {
          ...state.questions[payload.questionId],
          optionTwo: {
            ...state.questions[payload.questionId].optionTwo,
            votes: state.questions[payload.questionId].optionTwo.votes.concat(
              payload.voterId
            ),
          },
        },
      };
      // newQuestions[payload.questionId].optionTwo.votes.concat([
      //   payload.voterId,
      // ]);
    }
    console.log('new Questions', newQuestions[payload.questionId]);
    console.log('answerOption', payload.answerOption);
    return {
      ...state,
      questions: newQuestions,
    };
  })
);
