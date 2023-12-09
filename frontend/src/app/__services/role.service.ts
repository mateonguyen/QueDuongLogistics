import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../__models/role';

@Injectable({
	providedIn: 'root'
})
export class RoleService {
	baseUrl: string;

	constructor(
		private _http: HttpClient
	) {
		this.baseUrl = environment.apiUrl;
	}

	list() {
		return this._http.get<Role[]>(this.baseUrl + 'roles');
	}

	single(id: number) {
		return this._http.get<Role>(this.baseUrl + 'roles/' + id);
	}

	update(model: Role) {
		return this._http.put(this.baseUrl + 'roles/update', model);
	}

	create(model: Role) {
		return this._http.post(this.baseUrl + 'roles/create', model);
	}

	delete(id: number) {
		return this._http.delete(this.baseUrl + 'roles/' + id);
	}
}
