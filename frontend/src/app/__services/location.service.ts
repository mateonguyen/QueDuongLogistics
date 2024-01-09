import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/__models/location';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class LocationService {
	baseUrl: string;
	list: Location[] = [];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// refreshList() {
	// 	return this.http.get<Location[]>(this.baseUrl + 'location').subscribe({
	// 		next: res => {
	// 			this.list = res as Location[];
	// 		},
	// 		error: err => { console.log(err) }
	// 	});
	// }

	toList() {
		if (this.list.length > 0) return of(this.list);
		return this.http.get<Location[]>(this.baseUrl + 'location').pipe(
			map(res => {
				this.list = res as Location[];
				return this.list;
			})
		)
	}

	create(model: Location) {
		return this.http.post(this.baseUrl + 'location', model).pipe(
			map((res: Location[]) => {
				this.list = res;
			})
		);
	}

	update(model: Location) {
		return this.http.put(this.baseUrl + 'location', model).pipe(
			map((res: Location[]) => {
				this.list = res;
			})
		);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'location/' + id).pipe(
			map((res: Location[]) => {
				this.list = res;
			})
		);
	}
}
