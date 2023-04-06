import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable, map, take } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Question, IQuestion } from '../../store/models/question.model';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser, User } from 'src/app/store/models/user.model';
import { QuestionsService } from 'src/app/services/questions.service';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import { selectUsers } from 'src/app/store/selectors/users.selector';
import { selectAuthed } from 'src/app/store/selectors/auth.selector';
import { selectQuestions } from 'src/app/store/selectors/questions.selector';
import { alterQuestion } from 'src/app/store/actions/question.action';
import { addUserAnswer } from 'src/app/store/actions/user.action';

@Component({
  selector: 'poll-question',
  templateUrl: './poll-question.component.html',
})
export class PollQuestionComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private questionsService: QuestionsService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
    this.store.select(selectAuthed).subscribe((user) => {
      this.authedUser = user;
    });
    this.store.select(selectUsers).subscribe((users) => {
      this.users = Object.values(users);
      console.log('users', this.users);
    });
    this.store.select(selectQuestions).subscribe((questions) => {
      this.questions = Object.values(questions);
      console.log('questions', this.questions);
    });
  }
  isPolled = false;
  isLoading = true;
  isAnswered = false;
  users!: User[];
  authedUser!: User;
  selectedChoise = '';
  selectedOption = '';
  selectedChoiseIndex = 0;
  options: string[] = [];
  option = '';
  questionId = '';
  questions!: Question[];
  question!: Question;
  totalVotes = 0;
  optionOneVotes = 0;
  optionTwoVotes = 0;
  optionOneRate = 0;
  optionOneRateaa = '60';
  optionTwoRate = 0;
  username = '';
  authorInfo!: User | undefined;
  usernameDictionary!: string[][];
  questions$!: Observable<Question[]>;
  mappedAuthor: string[] = [];
  ngOnInit() {
    console.log('user poll', this.authedUser);

    this.questionId = this.route.snapshot.params['id'];
    this.question = this.questions.find(
      (q) => q.id === this.questionId
    ) as Question;
    this.authorInfo = this.users.find(
      (user) => user.id === this.question.author
    );
    this.options.push(this.question.optionOne.text);
    this.options.push(this.question.optionTwo.text);
    console.log('question poll', this.question.optionOne);
    console.log('question poll', this.question.optionTwo);
    if (this.question.optionOne.votes.includes(this.authedUser.id)) {
      this.selectedChoise = this.options[0];
      this.isAnswered = true;
    }
    if (this.question.optionTwo.votes.includes(this.authedUser.id)) {
      this.selectedChoise = this.options[1];
      this.isAnswered = true;
    }
    this.isLoading = false;
  }

  onPoll(pollForm: NgForm) {
    this.selectedChoise = pollForm.form.get('option')?.value;
    if (!this.isAnswered) {
      console.log('selected choise', this.selectedChoise);

      const index = this.options.indexOf(this.selectedChoise);

      this.store.dispatch(
        alterQuestion({
          voterId: this.authedUser.id,
          questionId: this.questionId,
          answerOption: index,
        })
      );
      this.store.dispatch(
        addUserAnswer({
          voterId: this.authedUser.id,
          questionId: this.questionId,
          answerOption: this.selectedOption,
        })
      );
    }
    this.question = this.questions.find(
      (q) => q.id === this.questionId
    ) as Question;

    this.calculateRates(this.question);
    this.snackBar.open('Your Answer Saved Successfully!', 'OK', {
      duration: 3000,
      panelClass: 'green-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.isPolled = !this.isPolled;
  }
  calculateRates(question: Question) {
    // console.log(question);
    this.optionOneVotes = question.optionOne.votes.length;
    this.optionTwoVotes = question.optionTwo.votes.length;
    this.totalVotes = this.optionOneVotes + this.optionTwoVotes;
    this.optionOneRate = (this.optionOneVotes / this.totalVotes) * 100;
    this.optionTwoRate = (this.optionTwoVotes / this.totalVotes) * 100;
  }
}
