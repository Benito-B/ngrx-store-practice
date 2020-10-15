import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromUser from "../state/user.reducer";
import * as userActions from "../state/user.actions";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<fromUser.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new userActions.LogoutUser());
  }
}
