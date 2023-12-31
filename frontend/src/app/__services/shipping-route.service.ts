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
		return this.http.get<ShippingRoute[]>(this.baseUrl + 'ShippingRoute').subscribe({
			next: res => {
				this.list = res as ShippingRoute[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: ShippingRoute) {
		return this.http.post(this.baseUrl + 'ShippingRoute', model);
	}

	update(model: ShippingRoute) {
		return this.http.put(this.baseUrl + 'ShippingRoute', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'ShippingRoute/' + id);
	}
}
