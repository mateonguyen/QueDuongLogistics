import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LayoutState, LayoutStore } from './layout.store';

@Injectable({
	providedIn: 'root',
})
export class LayoutQuery extends Query<LayoutState> {
	sidebarLinks$ = this.select('sideBarLinks');
	expanded$ = this.select('expanded');

	constructor(protected store: LayoutStore) {
		super(store);
	}

	get expanded(): boolean {
		return !!this.getValue().expanded;
	}
}
