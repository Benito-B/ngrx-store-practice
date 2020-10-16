import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { first, mergeMap } from "rxjs/operators";
import { LoggedUser } from "src/app/users/logged-user.model";
import * as fromUser from "../../users/state/user.reducer";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromUser.AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.addToken(request).pipe(
      first(),
      mergeMap((requestWithToken: HttpRequest<any>) =>
        next.handle(requestWithToken)
      )
    );
  }

  private addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this.store.pipe(
      select(fromUser.getLoggedUser),
      first(),
      mergeMap((loggedUser: LoggedUser) => {
        if (loggedUser && loggedUser.token) {
          request = request.clone({
            headers: request.headers.set("Authorization", loggedUser.token),
            withCredentials: true,
          });
        }
        return of(request);
      })
    );
  }
}
