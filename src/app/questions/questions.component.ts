import { AuthService } from '../services/auth.service';
import { User } from '../store/models/user.model';
import { Observable, Subscription, take } from 'rxjs';
import { IQuestion, Question } from '../store/models/question.model';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
import { UsersService } from '../services/users.service';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { selectAuthed } from '../store/selectors/auth.selector';
import { selectQuestions } from '../store/selectors/questions.selector';
import { selectUsers } from '../store/selectors/users.selector';

@Component({
  selector: 'app-home',
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit {
  isUserLogged = false;
  title = 'polling';
  authedUser!: User;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    this.store.select(selectAuthed).subscribe((user) => {
      this.authedUser = user;
    });
    this.store.select(selectQuestions).subscribe((questions) => {
      this.questions = Object.values(questions);
      console.log('questions', this.questions);
    });
    this.store.select(selectUsers).subscribe((users) => {
      this.users = Object.values(users);
      console.log('users', this.users);
    });
  }

  isAnsweredTab = false;
  isLoading = true;

  questions: Question[] = [];
  users: User[] = [];
  answeredQuestions!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  unansweredQuestions!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  questionsList!: {
    question: Question;
    isAnswered: boolean;
    authorName: string;
    authorAvatarUrl: string;
  }[];
  numOfAnswered = 0;
  numOfUnanswered = 0;
  username = '';

  ngOnInit() {
    this.questionsList = this.questions
      .sort((q1, q2) => q2.timestamp - q1.timestamp)
      .map((question) => {
        let authorName = '';
        let authorAvatarUrl = '';
        let isAnswered = false;
        for (let user of this.users) {
          if (user.id === question.author) {
            authorName = user.name;
            authorAvatarUrl = user.avatarURL;
          }
        }
        if (
          question.optionOne.votes.includes(this.authedUser.id) ||
          question.optionTwo.votes.includes(this.authedUser.id)
        )
          isAnswered = true;

        return { question, isAnswered, authorName, authorAvatarUrl };
      });

    this.answeredQuestions = this.questionsList.filter((question) => {
      return (
        question.question.optionOne.votes.includes(this.authedUser.id) ||
        question.question.optionTwo.votes.includes(this.authedUser.id)
      );
    });
    this.numOfAnswered = this.answeredQuestions.length;
    this.unansweredQuestions = this.questionsList.filter((question) => {
      return (
        !question.question.optionOne.votes.includes(this.authedUser.id) &&
        !question.question.optionTwo.votes.includes(this.authedUser.id)
      );
    });
    this.numOfUnanswered = this.unansweredQuestions.length;
  }
  onChangeTab() {
    this.isAnsweredTab = !this.isAnsweredTab;
  }
  onViewPoll(questionId: string) {
    this.router.navigate(['question', questionId]);
  }
}
