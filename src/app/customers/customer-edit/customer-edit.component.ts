import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Customer } from "../customer.model";
import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";

@Component({
  selector: "app-customer-edit",
  templateUrl: "./customer-edit.component.html",
  styleUrls: ["./customer-edit.component.scss"],
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  customer$: Observable<Customer>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null,
    });

    this.customer$ = this.store.select(fromCustomer.getCurrentCustomer);

    this.customer$.subscribe((currentCustomer) => {
      if (currentCustomer) {
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id,
        });
      }
    });

    this.actions$
      .pipe(
        ofType<customerActions.UpdateCustomerSuccess>(
          customerActions.CustomerActionTypes.UPDATE_CUSTOMERS_SUCCESS
        )
      )
      .subscribe(() => this.customerForm.reset());
    // Both this codes do the same thing
    // this.actions$.subscribe((action) => {
    //   if (
    //     action.type ===
    //     customerActions.CustomerActionTypes.UPDATE_CUSTOMERS_SUCCESS
    //   ) {
    //     this.customerForm.reset();
    //   }
    // });
  }

  updateCustomer() {
    const updatedCustomer: Customer = {
      name: this.customerForm.get("name").value,
      phone: this.customerForm.get("phone").value,
      address: this.customerForm.get("address").value,
      membership: this.customerForm.get("membership").value,
      id: this.customerForm.get("id").value,
    };

    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer));
  }
}
