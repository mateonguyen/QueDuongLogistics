import { Customer } from "./customer";
import { Driver } from "./driver";

export class Transaction {
	customerId: number;
	customer: Customer;
	driverId: number;
	driver: Driver;
}
