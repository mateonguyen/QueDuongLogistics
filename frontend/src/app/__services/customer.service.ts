import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/__models/customer';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	list() {
		return this.http.get<Partial<Customer[]>>(this.baseUrl + 'customer');
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
}
