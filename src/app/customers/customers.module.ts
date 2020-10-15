import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { RouterModule, Routes } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { customerReducer } from "./state/customer.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CustomerEffect } from "./state/customer.effects";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../guards/auth.guard";

const customerRoutes: Routes = [
  { path: "", component: CustomerComponent, canActivate: [AuthGuard] },
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
export class CustomersModule {}
