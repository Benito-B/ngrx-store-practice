import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromUser from "../users/state/user.reducer";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  userLoggedIn$: Observable<boolean>;
  navbarShow = false;
  constructor(private store: Store<fromUser.AppState>) {}

  ngOnInit() {
    this.userLoggedIn$ = this.store.pipe(select(fromUser.isUserLoggedIn));
  }
}
