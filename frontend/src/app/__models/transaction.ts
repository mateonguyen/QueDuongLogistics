import { Customer } from "./customer";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";

export class Transaction {
	customerId: number;
	customer: Customer;
	driverId: number;
	driver: Driver;
	vehicleId: number;
	vehicle: Vehicle;
}
