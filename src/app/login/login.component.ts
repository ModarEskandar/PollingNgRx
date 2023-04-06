import { AuthService } from './../services/auth.service';
import { User, IUser } from '../store/models/user.model';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AlertService } from './../services/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../store/app-state';
import { Store } from '@ngrx/store';
import { selectUsers } from '../store/selectors/users.selector';
import { login } from '../store/actions/auth.action';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  users!: IUser;
  usersArr!: User[];
  usernames: string[] = [];
  alertMsgObj!: { message: string; type: string };
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private snackBar: MatSnackBar,
    private store:Store<AppState>
  ) {
    this.store.select<IUser>(selectUsers).subscribe((users)=>{
      this.users = users;
    })
  }

  ngOnInit() {
    this.authService.autoLogin();

    
      this.usersArr = Object.values(this.users);
      this.usernames = this.usersArr.map((user) => user.name);


  }

  onLogin(signinform: NgForm) {
    const username = signinform.form.get('username')?.value;
    const user = this.usersArr.find((user) => user.name === username) as User;

    this.snackBar.open(`Welcome back! ${user?.name}`, undefined, {
      duration: 3000,
      panelClass: 'green-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.authService.login(user);
  }
}
