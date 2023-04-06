import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../store/models/user.model';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { selectAuthed } from '../store/selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private store:Store<AppState>) {}
  private isAuthenticated = false;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.select(selectAuthed).subscribe((user) => {
      this.isAuthenticated = (user.id!=='');
    });
      if (this.isAuthenticated) return true;
    return this.router.createUrlTree(['/login']);
  }
}
