import { Customer } from "./customer";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";
import { ShippingRoute } from "./shipping-route";
import { TransactionDetails } from "./transactionDetails";

export class Transaction {
	id: number;
	transactionNo: string;
	customerId: number;
	customer: Customer;
	driverId: number;
	driver: Driver;
	vehicleId: number;
	vehicle: Vehicle;
	shippingRouteId: number;
	shippingRoute: ShippingRoute;
	transactionDetails: TransactionDetails[];

	demurrageFee: number | string;
	transshipmentFee: number | string;
	returnShippingFee: number | string;
	customsFee: number | string;
	handlingFee: number | string;
	ticketFee: number | string;
	otherFee: number | string;
	docManager: string;
	isCustomerReturn: number;
	isSummitedDoc: number;
	notes: string;
}
