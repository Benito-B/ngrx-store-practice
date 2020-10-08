import { Action } from "@ngrx/store";
import { Customer } from "../customer.model";
import { Update } from "@ngrx/entity";

export enum CustomerActionTypes {
  LOAD_CUSTOMERS = "[Customer] Load Customers",
  LOAD_CUSTOMERS_SUCCESS = "[Customer] Load Customers Success",
  LOAD_CUSTOMERS_FAILURE = "[Customer] Load Customers Failure",
  LOAD_CUSTOMER = "[Customer] Load Customer",
  LOAD_CUSTOMER_SUCCESS = "[Customer] Load Customer Success",
  LOAD_CUSTOMER_FAILURE = "[Customer] Load Customer Failure",
  CREATE_CUSTOMER = "[Customer] Create Customer",
  CREATE_CUSTOMER_SUCCESS = "[Customer] Create Customer Success",
  CREATE_CUSTOMER_FAILURE = "[Customer] Create Customer Failure",
  UPDATE_CUSTOMER = "[Customer] Update Customer",
  UPDATE_CUSTOMERS_SUCCESS = "[Customer] Update Customer Success",
  UPDATE_CUSTOMERS_FAILURE = "[Customer] Update Customer Failure",
  DELETE_CUSTOMER = "[Customer] Delete Customer",
  DELETE_CUSTOMER_SUCCESS = "[Customer] Delete Customer Success",
  DELETE_CUSTOMER_FAILURE = "[Customer] Delete Customer Failure",
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS;
  constructor(public payload: Customer[]) {}
}

export class LoadCustomersFailure implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAILURE;
  constructor(public payload: string) {}
}

export class LoadCustomer implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER;
  constructor(public payload: number) {}
}

export class LoadCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

export class LoadCustomerFailure implements Action {
  readonly type = CustomerActionTypes.LOAD_CUSTOMER_FAILURE;
  constructor(public payload: string) {}
}

export class CreateCustomer implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class CreateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

export class CreateCustomerFailure implements Action {
  readonly type = CustomerActionTypes.CREATE_CUSTOMER_FAILURE;
  constructor(public payload: string) {}
}

export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMERS_SUCCESS;
  constructor(public payload: Update<Customer>) {}
}

export class UpdateCustomerFailure implements Action {
  readonly type = CustomerActionTypes.UPDATE_CUSTOMERS_FAILURE;
  constructor(public payload: string) {}
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER;
  constructor(public payload: number) {}
}

export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteCustomerFailure implements Action {
  readonly type = CustomerActionTypes.DELETE_CUSTOMER_FAILURE;
  constructor(public payload: string) {}
}

export type Action =
  | LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFailure
  | LoadCustomer
  | LoadCustomerSuccess
  | LoadCustomerFailure
  | UpdateCustomer
  | UpdateCustomerSuccess
  | UpdateCustomerFailure
  | CreateCustomer
  | CreateCustomerSuccess
  | CreateCustomerFailure
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFailure;
