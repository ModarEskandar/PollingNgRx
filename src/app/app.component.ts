import { UsersService } from './services/users.service';
import { addQuestion, getQuestions } from './store/actions/question.action';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginComponent } from './login/login.component';
import {
  AfterViewChecked,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { IQuestion, Question } from './store/models/question.model';
import { DataService } from './services/data.service';
import { QuestionsService } from './services/questions.service';
import { IUser, User } from './store/models/user.model';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AppState } from './store/app-state';
import { Store } from '@ngrx/store';
import { selectUsers } from './store/selectors/users.selector';
import { selectQuestions } from './store/selectors/questions.selector';
import { selectAuthed } from './store/selectors/auth.selector';
import { getUsers } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLodingRoute = false;
  title = 'polling';
  authedUser!: User;
  usernames: string[] = [];
  questionsIds: string[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLodingRoute = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLodingRoute = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.store.select(selectAuthed).subscribe((user) => {
      this.authedUser = user;
    });
    this.store.select<IUser>(selectUsers).subscribe((users) => {
      this.usernames = Object.keys(users);
    });
    this.store.select<IQuestion>(selectQuestions).subscribe((questions) => {
      this.questionsIds = Object.keys(questions);
    });
  }


  
  ngOnInit() {
    this.store.dispatch(getUsers());
    this.store.dispatch(getQuestions());
  }
}
