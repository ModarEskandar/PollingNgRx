import { Question } from './../store/models/question.model';
import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { DataService } from './data.service';
import { Observable, from } from 'rxjs';

export interface QuestionsState {
  questions: Question[];
}
export interface QuestionsState {
  questions: Question[];
}
export const initialState: QuestionsState = {
  questions: [],
};

@Injectable({ providedIn: 'root' })
export class QuestionsService extends Store<QuestionsState> {
  constructor(private dataService: DataService) {
    super(initialState); // pass initial state
  }
  initQuestions(questions: Question[]) {
    this.setState((state) => ({
      questions: [...questions],
    }));
  }
  addQuestion(question: Question) {
    this.setState((state) => ({
      questions: [...state.questions, question],
    }));
  }
  getState(): Observable<any> {
    return from(this.dataService._getQuestions());
  }
  //   addQuestion(question: { [key: string]: Question }) {
  //     this.setState((state) => ({
  //       questions: Object.assign(state,question) ,
  //     }));
  //   }
}
