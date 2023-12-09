import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SideBarLink } from 'src/app/__core/models/nav-link';

export interface AppState {
	expanded: boolean;
	isLoading: boolean;
	sideBarLinks: SideBarLink[];
}

export function createInitialState(): AppState {
	return {
		expanded: true,
		isLoading: false,
		sideBarLinks: []
	} as AppState;
}

@Injectable({
	providedIn: 'root',
})
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
	constructor() {
		super(createInitialState());
	}
}
