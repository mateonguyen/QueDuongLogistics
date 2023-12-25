import { Injectable } from '@angular/core';
import { Transaction } from '../__models/transaction';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../__models/pagination';
import { getPaginatedResult, getPaginationHeader } from '../__helpers/paginationHelper';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	baseUrl = environment.apiUrl;
	list: Transaction[];

	constructor(
		private _http: HttpClient
	) { }

	toList(
		pageIndex: number,
		pageSize: number,
		sortField: string | 'SoHieu',
		sortOrder: string | 'descend',
		startDate: string | null,
		endDate: string | null,
		//filters: Array<{ key: string; value: string[] }>
		term: string
	): Observable<PaginatedResult<Transaction[]>> {
		let params = getPaginationHeader(pageIndex, pageSize)
			.append('term', term)
			.append('sortField', `${sortField}`)
			.append('sortOrder', `${sortOrder}`);
		// .append('startDate', startDate == null ? '' : startDate)
		// .append('endDate', endDate == null ? '' : endDate);

		// filters.forEach(filter => {
		// 	filter.value.forEach(value => {
		// 		params = params.append(filter.key, value);
		// 	});
		// });

		return getPaginatedResult<Transaction[]>(this.baseUrl + 'transaction', params, this._http);
	}

	refreshList() {
		return this._http.get<Transaction[]>(this.baseUrl + 'transaction').subscribe({
			next: res => {
				this.list = res as Transaction[];
			},
			error: err => { console.log(err) }
		});
	}

	create(model: Transaction) {
		return this._http.post(this.baseUrl + 'transaction', model);
	}

	update(model: Transaction) {
		return this._http.put(this.baseUrl + 'transaction', model);
	}

	delete(id: number) {
		return this._http.delete(this.baseUrl + 'transaction/' + id);
	}
}
