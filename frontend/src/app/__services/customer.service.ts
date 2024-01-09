import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/__models/customer';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	baseUrl: string;
	list: Customer[] = [];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// refreshList() {
	// 	return this.http.get<Customer[]>(this.baseUrl + 'customer').subscribe({
	// 		next: res => {
	// 			this.list = res as Customer[];
	// 		},
	// 		error: err => { console.log(err) }
	// 	});
	// }

	toList() {
		if (this.list.length > 0) return of(this.list);
		return this.http.get<Customer[]>(this.baseUrl + 'customer').pipe(
			map(res => {
				this.list = res as Customer[];
				return this.list;
			})
		)
	}

	create(model: Customer) {
		return this.http.post(this.baseUrl + 'customer', model).pipe(
			map((res: Customer[]) => {
				this.list = res;
			})
		);
	}

	update(model: Customer) {
		debugger;
		return this.http.put(this.baseUrl + 'customer', model).pipe(
			map((res: Customer[]) => {
				this.list = res;
			})
		);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'customer/' + id).pipe(
			map((res: Customer[]) => {
				this.list = res;
			})
		);
	}

	import(model: Customer[]) {
		return this.http.post(this.baseUrl + 'customer/import', model);
	}
}
