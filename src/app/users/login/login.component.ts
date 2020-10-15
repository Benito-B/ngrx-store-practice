import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import * as fromUser from "../state/user.reducer";
import * as userActions from "../state/user.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userLoggedIn$: Observable<boolean>;
  loginForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(
    private store: Store<fromUser.AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userLoggedIn$ = this.store.pipe(select(fromUser.isUserLoggedIn));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(new userActions.LoginUser(this.loginForm.value));
    }
  }
}
