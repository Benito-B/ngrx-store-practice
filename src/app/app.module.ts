import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Store, StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { ReactiveFormsModule } from "@angular/forms";
import { userReducer } from "./users/state/user.reducer";
import { customerReducer } from "./customers/state/customer.reducer";
import { TokenInterceptorService } from "./services/interceptors/token-interceptor.service";
import { AppState } from "./state/app-state";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ user: userReducer, customers: customerReducer }),
    AppRoutingModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
