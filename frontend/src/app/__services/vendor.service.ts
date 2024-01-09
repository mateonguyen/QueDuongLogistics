import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from 'src/app/__models/vendor';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class VendorService {
	baseUrl: string;
	list: Vendor[] = [];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// refreshList() {
	// 	return this.http.get<Vendor[]>(this.baseUrl + 'vendor').subscribe({
	// 		next: res => {
	// 			this.list = res as Vendor[];
	// 		},
	// 		error: err => { console.log(err) }
	// 	});
	// }

	toList() {
		if (this.list.length > 0) return of(this.list);
		return this.http.get<Vendor[]>(this.baseUrl + 'vendor').pipe(
			map(res => {
				this.list = res as Vendor[];
				return this.list;
			})
		)
	}

	create(model: Vendor) {
		console.log(model);

		return this.http.post(this.baseUrl + 'vendor', model).pipe(
			map((res: Vendor[]) => {
				this.list = res;
			})
		);
	}

	update(model: Vendor) {
		return this.http.put(this.baseUrl + 'vendor', model).pipe(
			map((res: Vendor[]) => {
				this.list = res;
			})
		);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'vendor/' + id).pipe(
			map((res: Vendor[]) => {
				this.list = res;
			})
		);
	}

	import(model: Vendor[]) {
		return this.http.post(this.baseUrl + 'vendor/import', model);
	}
}
