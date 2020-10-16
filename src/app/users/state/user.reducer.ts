import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../state/app-state";
import { LoggedUser } from "../logged-user.model";
import * as userActions from "./user.actions";

export interface UserState {
  loggedUser: LoggedUser | null;
  loggedIn: boolean;
}

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

const initialState = {
  loggedUser: null,
  loggedIn: false,
};

export function userReducer(
  state = initialState,
  action: userActions.Action
): UserState {
  switch (action.type) {
    case userActions.UserActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loggedUser: action.payload,
        loggedIn: true,
      };
    }
    case userActions.UserActionTypes.LOGIN_USER_FAILURE: {
      return {
        ...state,
        loggedUser: null,
        loggedIn: false,
      };
    }
    case userActions.UserActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loggedUser: null,
        loggedIn: false,
      };
    }
    default: {
      const storedState = localStorage.getItem("userState");
      if (storedState) {
        state = JSON.parse(storedState);
      }
      return state;
    }
  }
}

const getUserFeature = createFeatureSelector<UserState>("user");

export const getLoggedUser = createSelector(
  getUserFeature,
  (state: UserState) => state.loggedUser
);

export const isUserLoggedIn = createSelector(
  getUserFeature,
  (state: UserState) => state.loggedIn
);
