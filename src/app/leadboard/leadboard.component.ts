import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../store/models/question.model';
import { UsersService } from '../services/users.service';
import { User } from '../store/models/user.model';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { selectUsers } from '../store/selectors/users.selector';

@Component({
  selector: 'leadboard',
  templateUrl: './leadboard.component.html',
})
export class LeadboardComponent implements OnInit {
  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUsers).subscribe((users) => {
      this.users = Object.values(users);
      this.isLoading = false;

      console.log('users', this.users);
    });
  }

  isLoading = true;
  questions: Question[] = [];
  users: User[] = [];
  leadboard!: { user: string; asked: number; answered: number }[];
  scores!: {
    username: string;
    avatarUrl: string;
    asked: number;
    answered: number;
  }[];
  ngOnInit() {
    this.scores = this.users
      .map((user) => {
        return {
          username: user.name,
          avatarUrl: user.avatarURL,
          asked: user.questions.length,
          answered: Object.keys(user.answers).length,
        };
      })
      .sort((s1, s2) => s2.answered + s2.asked - (s1.answered + s1.asked));
  }
}
