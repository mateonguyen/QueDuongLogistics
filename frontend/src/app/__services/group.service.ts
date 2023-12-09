import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/__models/group';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GroupService {
	baseUrl: string;

	constructor(private http: HttpClient) {
		this.baseUrl = environment.apiUrl;
	}

	list() {
		return this.http.get<Partial<Group[]>>(this.baseUrl + 'groups/groups-with-roles');
	}

	create(model: Group) {
		return this.http.post(this.baseUrl + 'groups/create', model);
	}

	update(model: Group) {
		return this.http.put(this.baseUrl + 'groups/update', model);
	}

	delete(id: number) {
		return this.http.delete(this.baseUrl + 'groups/' + id);
	}

	// getGroupsWithRoles() {
	// 	return this.http.get<Partial<Group[]>>(this.baseUrl + 'groups/groups-with-roles');
	// }

	updateGroupRoles(groupId: number, roles: string[]) {
		return this.http.post(this.baseUrl + 'groups/edit-roles/' + groupId + '?roles=' + roles, {});
	}
}
