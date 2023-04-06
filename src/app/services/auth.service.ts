import { DataService } from 'src/app/services/data.service';
import { User } from '../store/models/user.model';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { login } from '../store/actions/auth.action';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router,private store:Store<AppState>) {}


  login(user: User) {
    this.store.dispatch(login({user:user}))
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.router.navigate(['/home']);
  }
  logout() {
    const user:User={id:'', name:'', avatarURL:'', answers:{}, questions:[]}
    this.store.dispatch(login({user:user}))
    this.router.navigate(['/login']);
    localStorage.removeItem('userInfo');
  }
  autoLogin() {
    const userInfo = localStorage.getItem('userInfo') as string;
    const user: User = JSON.parse(userInfo);
    console.log('auto login', user);
    if (!user) return;
    this.store.dispatch(login({user:user}))
    this.router.navigate(['/home']);
  }
}
