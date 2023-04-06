import { Injectable } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { EMPTY, from, map, switchMap, withLatestFrom } from 'rxjs';
import { getUsersSuccess } from './../actions/user.action';
import { selectUsers } from '../selectors/users.selector';
import { AppState } from '../app-state';

@Injectable()
export class UsersEffect {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<AppState>
  ) {}

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() =>
      from(this.dataService._getUsers()).pipe(
        map((users) => UserActions.getUsersSuccess({ users: users }))
      )
    )
    )
  );
}
