import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoggedUser } from "../users/logged-user.model";
import * as fromUser from "../users/state/user.reducer";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  loggedUser$: Observable<LoggedUser>;
  constructor(private store: Store<fromUser.AppState>, private router: Router) {
    this.loggedUser$ = this.store.select(fromUser.getLoggedUser);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loggedUser$.pipe(
      map((loggedUser) => {
        if (loggedUser && loggedUser.isAdmin) {
          return true;
        }
        return false;
      })
    );
  }
}
