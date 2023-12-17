import { Location } from './location';

export interface ShippingRoute {
	id: number;
	routeCode: string;
	originId: number;
	destinationId: number;
	origin: Location;
	destination: Location;
}
