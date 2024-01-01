import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/__models/customer';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	baseUrl: string;
	list: Customer[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<Customer[]>(this.baseUrl + 'customer').subscribe({
			next: res => {
				this.list = res as Customer[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: Customer) {
		return this.http.post(this.baseUrl + 'customer', model);
	}

	update(model: Customer) {
		return this.http.put(this.baseUrl + 'customer', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'customer/' + id);
	}

	import(model: Customer[]) {
		return this.http.post(this.baseUrl + 'customer/import', model);
	}
}
