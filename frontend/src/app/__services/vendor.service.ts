import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vendor } from 'src/app/__models/vendor';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class VendorService {
	baseUrl: string;
	list: Vendor[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<Vendor[]>(this.baseUrl + 'vendor').subscribe({
			next: res => {
				this.list = res as Vendor[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: Vendor) {
		return this.http.post(this.baseUrl + 'vendor', model);
	}

	update(model: Vendor) {
		return this.http.put(this.baseUrl + 'vendor', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'vendor/' + id);
	}

	import(model: Vendor[]) {
		return this.http.post(this.baseUrl + 'vendor/import', model);
	}
}
