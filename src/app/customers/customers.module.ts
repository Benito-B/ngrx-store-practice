import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { CustomerEffect } from "./state/customer.effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../guards/auth.guard";
import { AdminGuard } from "../guards/admin.guard";
import { CustomerState } from "./state/customer.reducer";
import { Store } from "@ngrx/store";

const customerRoutes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    EffectsModule.forFeature([CustomerEffect]),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CustomersModule {
  // constructor(private store: Store<CustomerState>) {
  //   this.store.subscribe((currentStore) =>
  //     localStorage.setItem("state", JSON.stringify(currentStore))
  //   );
  // }
}
