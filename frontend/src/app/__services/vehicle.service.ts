import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/app/__models/vehicle';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class VehicleService {
	baseUrl: string;
	list: Vehicle[] = [];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// refreshList() {
	// 	return this.http.get<Vehicle[]>(this.baseUrl + 'vehicle').subscribe({
	// 		next: res => {
	// 			this.list = res as Vehicle[];
	// 		},
	// 		error: err => { console.log(err) }
	// 	});
	// }

	toList() {
		if (this.list.length > 0) return of(this.list);
		return this.http.get<Vehicle[]>(this.baseUrl + 'vehicle').pipe(
			map(res => {
				this.list = res as Vehicle[];
				return this.list;
			})
		)
	}

	create(model: Vehicle) {
		return this.http.post(this.baseUrl + 'vehicle', model).pipe(
			map((res: Vehicle[]) => {
				this.list = res;
			})
		);
	}

	update(model: Vehicle) {
		return this.http.put(this.baseUrl + 'vehicle', model).pipe(
			map((res: Vehicle[]) => {
				this.list = res;
			})
		);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'vehicle/' + id).pipe(
			map((res: Vehicle[]) => {
				this.list = res;
			})
		);
	}

	import(model: Vehicle[]) {
		return this.http.post(this.baseUrl + 'vehicle/import', model);
	}
}
