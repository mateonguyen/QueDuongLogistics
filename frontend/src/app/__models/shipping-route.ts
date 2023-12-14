export interface ShippingRoute {
	id: number;
	routeCode: string;
	origin: string;
	destination: string;
	created: Date;
	creator: string;
	modified: Date;
	modifier: string;
}
