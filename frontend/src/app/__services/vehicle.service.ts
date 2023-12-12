import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/app/__models/vehicle';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class VehicleService {
	baseUrl: string;
	list: Vehicle[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<Vehicle[]>(this.baseUrl + 'vehicle').subscribe({
			next: res => {
				this.list = res as Vehicle[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: Vehicle) {
		return this.http.post(this.baseUrl + 'vehicle', model);
	}

	update(model: Vehicle) {
		return this.http.put(this.baseUrl + 'vehicle', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'vehicle/' + id);
	}
}
