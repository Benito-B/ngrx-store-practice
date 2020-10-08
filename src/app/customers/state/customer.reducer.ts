import { Customer } from "../customer.model";
import * as fromRoot from "../../state/app-state";
import * as customerActions from "./customer.actions";
import { createFeatureSelector, createSelector, Store } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<
  Customer
>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: false,
  error: "",
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

export function customerReducer(
  state = initialState,
  action: customerActions.Action
): CustomerState {
  switch (action.type) {
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAILURE: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, {
        ...state,
        selectedCustomerId: action.payload.id,
      });
    }
    case customerActions.CustomerActionTypes.LOAD_CUSTOMER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload, state);
    }
    case customerActions.CustomerActionTypes.CREATE_CUSTOMER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.UPDATE_CUSTOMERS_SUCCESS: {
      const newState = customerAdapter.updateOne(action.payload, state);
      return {
        ...newState,
        selectedCustomerId: null,
      };
    }
    case customerActions.CustomerActionTypes.UPDATE_CUSTOMERS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload, state);
    }
    case customerActions.CustomerActionTypes.DELETE_CUSTOMER_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  "customers"
);

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);

export const getCurrentCustomerId = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.selectedCustomerId
);

export const getCurrentCustomer = createSelector(
  getCustomerFeatureState,
  getCurrentCustomerId,
  (state) => state.entities[state.selectedCustomerId]
);
