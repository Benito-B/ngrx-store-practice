import { Action } from "@ngrx/store";
import { User } from "../user.model";
import { Update } from "@ngrx/entity";

export enum UserActionTypes {
  LOGIN_USER = "[USER] Login User",
  LOGIN_USER_SUCCESS = "[USER] Login User Success",
  LOGIN_USER_FAILURE = "[USER] Login User Failure",
  LOGOUT_USER = "[USER] Logout User",
  LOGOUT_USER_SUCCESS = "[USER] Logout User",
  LOGOUT_USER_FAILURE = "[USER] Logout User",
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.LOGIN_USER;
  constructor(public payload: User) {}
}

export class LoginUserSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginUserFailure implements Action {
  readonly type = UserActionTypes.LOGIN_USER_FAILURE;
  constructor(public payload: string) {}
}

export class LogoutUser implements Action {
  readonly type = UserActionTypes.LOGOUT_USER;
}

export type Action =
  | LoginUser
  | LoginUserSuccess
  | LoginUserFailure
  | LogoutUser;
