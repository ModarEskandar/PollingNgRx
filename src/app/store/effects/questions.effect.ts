import { Injectable } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as QuestionActions from '../actions/question.action';
import { EMPTY, from, map, mergeMap, withLatestFrom,switchMap } from 'rxjs';
import { selectQuestions } from '../selectors/questions.selector';
import { AppState } from '../app-state';

@Injectable()
export class QuestionsEffect {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>
  ) {}


  loadAllQuestions$ = createEffect(() =>
  this.actions$.pipe(
    ofType(QuestionActions.getQuestions),
    switchMap(() =>
      from(this.dataService._getQuestions()).pipe(
        map((questions) => QuestionActions.getQuestionsSuccess({ allQuestions: questions }))
      )
    )
  )
);
}
