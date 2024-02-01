import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Transaction } from '../__models/transaction';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../__models/pagination';
import { getPaginatedResult, getPaginationHeader } from '../__helpers/paginationHelper';
import { TransactionParams } from '../__models/transaction-params';
import { formatDate } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	baseUrl = environment.apiUrl;

	constructor(
		private _http: HttpClient,
		@Inject(LOCALE_ID) public locale: string,
	) { }

	list(transactionParams: TransactionParams): Observable<PaginatedResult<Transaction[]>> {
		let _transDateFrom = transactionParams.transDateFrom == null ? '' : formatDate(transactionParams.transDateFrom, 'yyyyMMdd', this.locale);
		let _transDateTo = transactionParams.transDateTo == null ? '' : formatDate(transactionParams.transDateTo, 'yyyyMMdd', this.locale);

		let params = getPaginationHeader(transactionParams.pageNumber, transactionParams.pageSize)
			.append('term', transactionParams.term)
			.append('sortField', `${transactionParams.sortField}`)
			.append('sortOrder', `${transactionParams.sortOrder}`)
			.append('transDateFrom', _transDateFrom)
			.append('transDateTo', _transDateTo)
			.append('customerId', transactionParams.customerFilter ?? 0)
			.append('vendorId', transactionParams.vendorFilter ?? 0);

		return getPaginatedResult<Transaction[]>(this.baseUrl + 'transaction', params, this._http);
	}

	listForExport(transactionParams: TransactionParams): Observable<Transaction[]> {
		let _transDateFrom = transactionParams.transDateFrom == null ? '' : formatDate(transactionParams.transDateFrom, 'yyyyMMdd', this.locale);
		let _transDateTo = transactionParams.transDateTo == null ? '' : formatDate(transactionParams.transDateTo, 'yyyyMMdd', this.locale);

		let params = new HttpParams();

		params = params.append('term', transactionParams.term)
			.append('sortField', `${transactionParams.sortField}`)
			.append('sortOrder', `${transactionParams.sortOrder}`)
			.append('transDateFrom', _transDateFrom)
			.append('transDateTo', _transDateTo)
			.append('customerId', transactionParams.customerFilter ?? 0)
			.append('vendorId', transactionParams.vendorFilter ?? 0);

		return this._http.get<Transaction[]>(this.baseUrl + 'transaction/export', { params });
	}

	single(id: number) {
		return this._http.get<Transaction>(this.baseUrl + 'transaction/' + id);
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
