import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShippingRoute } from 'src/app/__models/shipping-route';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ShippingRouteService {
	baseUrl: string;
	list: ShippingRoute[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<ShippingRoute[]>(this.baseUrl + 'shipping-route').subscribe({
			next: res => {
				this.list = res as ShippingRoute[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: ShippingRoute) {
		return this.http.post(this.baseUrl + 'shipping-route', model);
	}

	update(model: ShippingRoute) {
		return this.http.put(this.baseUrl + 'shipping-route', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'shipping-route/' + id);
	}
}
