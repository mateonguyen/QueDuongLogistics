import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppState, AppStore } from './app.store';

@Injectable({
	providedIn: 'root',
})
export class AppQuery extends Query<AppState> {
	isLoading$ = this.select('isLoading');
	sidebarLinks$ = this.select('sideBarLinks');
	expanded$ = this.select('expanded');

	constructor(protected store: AppStore) {
		super(store);
	}

	get expanded(): boolean {
		return !!this.getValue().expanded;
	}
}
