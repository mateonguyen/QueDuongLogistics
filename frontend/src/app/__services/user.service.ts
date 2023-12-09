import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/__models/user';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	// getUsers(page?: number, itemsPerPage?: number) {
	// 	const params = getPaginationHeader(page, itemsPerPage);

	// 	// var response = this.usersCache.get(Object.values(params).join('-'));
	// 	const response = this.usersCache.get(
	// 		page.toString() + '-' + itemsPerPage.toString()
	// 	);
	// 	if (response) {
	// 		return of(response);
	// 	}

	// 	return getPaginatedResult<User[]>(this.baseUrl + 'users', params, this.http).pipe(
	// 		map((res) => {
	// 			// this.usersCache.set(Object.values(params).join('-'), response);
	// 			this.usersCache.set(
	// 				page.toString() + '-' + itemsPerPage.toString(),
	// 				res
	// 			);
	// 			return res;
	// 		})
	// 	);
	// }

	list() {
		return this.http.get<User[]>(this.baseUrl + 'users');
	}

	create(model: User) {
		return this.http.post(this.baseUrl + 'users/create', model);
	}

	update(model: User) {
		return this.http.put(this.baseUrl + 'users/update', model);
	}
}
