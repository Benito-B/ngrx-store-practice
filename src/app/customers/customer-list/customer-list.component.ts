import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Customer } from "../customer.model";
import * as fromCustomer from "../state/customer.reducer";
import * as customerActions from "../state/customer.actions";
import { Observable } from "rxjs";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  error$: Observable<string>;

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }

  deleteCustomer(customer: Customer) {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }
}
