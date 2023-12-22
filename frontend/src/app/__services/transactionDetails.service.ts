import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root'
})
export class TransactionDetailsService {
	baseUrl: string;
	list: TransactionDetails[];

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	refreshList() {
		return this.http.get<TransactionDetails[]>(this.baseUrl + 'transactionDetails').subscribe({
			next: res => {
				this.list = res as TransactionDetails[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: TransactionDetails) {
		return this.http.post(this.baseUrl + 'transactionDetails', model);
	}

	update(model: TransactionDetails) {
		return this.http.put(this.baseUrl + 'transactionDetails', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'transactionDetails/' + id);
	}
}
