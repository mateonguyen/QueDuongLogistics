import { Customer } from "./customer";
import { Driver } from "./driver";
import { Vehicle } from "./vehicle";
import { ShippingRoute } from "./shipping-route";
import { TransactionDetails } from "./transactionDetails";
import { Vendor } from "./vendor";

export class Transaction {
	id: number;
	transactionNo: string;
	customerId: number;
	customerName: string;
	customer: Customer;
	driverId: number;
	driverName: string;
	driver: Driver;
	vehicleId: number;
	vehicleName: string;
	vehicle: Vehicle;
	vendorId: number;
	vendorName: string;
	vendor: Vendor;
	shippingRouteId: number;
	shippingRoute: ShippingRoute;
	shippingRouteName: string;
	transactionDetails: TransactionDetails[];
	transactionDate: Date;

	demurrageFee: number;
	transshipmentFee: number;
	returnShippingFee: number;
	customsFee: number;
	handlingFee: number;
	ticketFee: number;
	otherFee: number;
	docManager: string;
	isCustomerReturn: boolean;
	isSummitedDoc: boolean;
	notes: string;
}
