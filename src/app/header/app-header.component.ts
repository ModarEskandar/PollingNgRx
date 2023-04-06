import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { User } from '../store/models/user.model';
import { Store } from '@ngrx/store';
import { AlertService } from '../services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../store/app-state';
import { selectAuthed } from '../store/selectors/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  appTitle = 'Polling';
  authedUser: string = '';
  avatarUrl: string = '';
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    
    this.store.select(selectAuthed).subscribe((user) => {
      this.isAuthenticated = (user.id!=='');
      console.log('app header on init', !!user);
      this.isAuthenticated = !!user;
      this.authedUser = user?.name as string;
      this.avatarUrl = user?.avatarURL as string;
    });
  }
  onLogout() {
    this.snackBar.open('Logged out successfully', undefined, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['green-snackbar'],
    });
    this.authService.logout();
  }
}
