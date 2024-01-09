import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from 'src/app/__models/driver';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class DriverService {
	baseUrl: string;
	list: Driver[] = [];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// refreshList() {
	// 	return this.http.get<Driver[]>(this.baseUrl + 'driver').subscribe({
	// 		next: res => {
	// 			this.list = res as Driver[];
	// 		},
	// 		error: err => { console.log(err) }
	// 	});
	// }

	toList() {
		if (this.list.length > 0) return of(this.list);
		return this.http.get<Driver[]>(this.baseUrl + 'driver').pipe(
			map(res => {
				this.list = res as Driver[];
				return this.list;
			})
		)
	}

	create(model: Driver) {
		return this.http.post(this.baseUrl + 'driver', model).pipe(
			map((res: Driver[]) => {
				this.list = res;
			})
		);
	}

	update(model: Driver) {
		return this.http.put(this.baseUrl + 'driver', model).pipe(
			map((res: Driver[]) => {
				this.list = res;
			})
		);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'driver/' + id).pipe(
			map((res: Driver[]) => {
				this.list = res;
			})
		);
	}

	import(model: Driver[]) {
		return this.http.post(this.baseUrl + 'driver/import', model);
	}
}
