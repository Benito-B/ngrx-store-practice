import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./state/user.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEffect } from "./state/user.effects";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "../guards/auth.guard";

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
export class UsersModule {}
