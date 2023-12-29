import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from 'src/app/__models/driver';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class DriverService {
	baseUrl: string;
	list: Driver[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<Driver[]>(this.baseUrl + 'driver').subscribe({
			next: res => {
				this.list = res as Driver[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: Driver) {
		return this.http.post(this.baseUrl + 'driver', model);
	}

	update(model: Driver) {
		return this.http.put(this.baseUrl + 'driver', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'driver/' + id);
	}

	import(model: Driver[]) {
		return this.http.post(this.baseUrl + 'driver/import', model);
	}
}
