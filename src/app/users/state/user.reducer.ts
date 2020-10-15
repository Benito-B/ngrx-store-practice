import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../state/app-state";
import * as userActions from "./user.actions";

export interface UserState {
  token: string | null;
  loggedIn: boolean;
}

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

const initialState = {
  token: null,
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
        token: action.payload.token,
        loggedIn: true,
      };
    }
    case userActions.UserActionTypes.LOGIN_USER_FAILURE: {
      return {
        ...state,
        token: null,
        loggedIn: false,
      };
    }
    case userActions.UserActionTypes.LOGOUT_USER: {
      return {
        ...state,
        token: null,
        loggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}

const getUserFeature = createFeatureSelector<UserState>("user");

export const getToken = createSelector(
  getUserFeature,
  (state: UserState) => state.token
);

export const isUserLoggedIn = createSelector(
  getUserFeature,
  (state: UserState) => state.loggedIn
);
