import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { DataService } from './data.service';
import { Observable, from } from 'rxjs';
import { User } from '../store/models/user.model';

export interface UsersState {
  users: User[];
}
export interface UsersState {
  users: User[];
}
export const initialState: UsersState = {
  users: [],
};

@Injectable({ providedIn: 'root' })
export class UsersService extends Store<UsersState> {
  constructor(private dataService: DataService) {
    super(initialState); // pass initial state
  }
  initUsers(users: User[]) {
    this.setState((state) => ({
      users: [...users],
    }));
  }
  addUser(user: User) {
    this.setState((state) => ({
      users: [...state.users, user],
    }));
  }
  getState(): Observable<any> {
    return from(this.dataService._getUsers());
  }
  //   addUser(user: { [key: string]: User }) {
  //     this.setState((state) => ({
  //       users: Object.assign(state,user) ,
  //     }));
  //   }
}
