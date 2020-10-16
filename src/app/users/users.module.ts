import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Store, StoreModule } from "@ngrx/store";
import { userReducer, UserState } from "./state/user.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffect } from "./state/user.effects";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "../guards/auth.guard";
import { AppState } from "../state/app-state";

const userRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    EffectsModule.forFeature([UserEffect]),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UsersModule {
  constructor(private store: Store<any>) {
    this.store.subscribe((currentStore) => {
      localStorage.setItem("userState", JSON.stringify(currentStore.user));
    });
  }
}
