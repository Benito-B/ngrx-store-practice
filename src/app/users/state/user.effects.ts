import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, mergeMap, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { UserService } from "../user.service";
import * as userActions from "../state/user.actions";
import { User } from "../user.model";
import { LoggedUser } from "../logged-user.model";

@Injectable()
export class UserEffect {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loginUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoginUser>(userActions.UserActionTypes.LOGIN_USER),
    map((action: userActions.LoginUser) => action.payload),
    mergeMap((user: User) =>
      this.userService.loginUser(user).pipe(
        map(
          (loggedUser: LoggedUser) =>
            new userActions.LoginUserSuccess(loggedUser),
          catchError((err) => of(new userActions.LoginUserFailure(err.message)))
        )
      )
    )
  );
}
