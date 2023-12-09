import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Audit } from '../__models/audit';
import { VisitorCounter } from '../__models/visitor-counter';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	baseUrl: string;

	constructor(private _http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	listAudit() {
		return this._http.get<Partial<Audit[]>>(this.baseUrl + 'admin/audit-home');
	}

	updateVisitCounter(type: string) {
		return this._http.get<VisitorCounter>(this.baseUrl + 'admin/visitor-counter/' + type);
	}

	updateCounter(type: string) {
		return this._http.post(this.baseUrl + 'admin/update-counter?type=' + type, {});
	}
}
