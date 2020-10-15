import { Injectable } from "@angular/core";
import * as fromUser from "../users/state/user.reducer";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  userLoggedIn$: Observable<boolean>;

  constructor(private store: Store<fromUser.AppState>, private router: Router) {
    this.userLoggedIn$ = this.store.pipe(select(fromUser.isUserLoggedIn));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userLoggedIn$.pipe(
      map((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(["/users/login"]);
          return false;
        }
        return true;
      })
    );
  }
}
