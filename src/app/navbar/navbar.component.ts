import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LoggedUser } from "../users/logged-user.model";
import * as fromUser from "../users/state/user.reducer";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  username: string;
  isAdmin = false;
  userLoggedIn$: Observable<boolean>;
  loggedUser$: Observable<LoggedUser>;
  navbarShow = false;
  constructor(private store: Store<fromUser.AppState>) {}

  ngOnInit() {
    this.userLoggedIn$ = this.store.pipe(select(fromUser.isUserLoggedIn));
    this.loggedUser$ = this.store.pipe(select(fromUser.getLoggedUser));
    this.loggedUser$.subscribe((loggedUser) => {
      // console.log("USER FETCHED:", loggedUser);
      if (loggedUser) {
        this.username = loggedUser.name;
        this.isAdmin = loggedUser.isAdmin;
      } else {
        this.username = "";
        this.isAdmin = false;
      }
    });
  }
}
