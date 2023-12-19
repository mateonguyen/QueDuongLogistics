import { Customer } from "./customer";

export interface Transaction {
	customerId: number;
	customer: Customer;
}
