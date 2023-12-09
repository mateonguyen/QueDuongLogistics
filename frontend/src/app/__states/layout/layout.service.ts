import { Injectable } from '@angular/core';
import { SideBarLink } from 'src/app/__models/ui-models/nav-link';
import { LayoutStore } from './layout.store';

@Injectable({
	providedIn: 'root',
})
export class LayoutService {
	constructor(private store: LayoutStore) { }

	setSideBarLinks(sideBarLinks: SideBarLink[]): void {
		this.store.update({
			sideBarLinks,
		});
	}

	handleResize(): void {
		const match = window.matchMedia('(min-width: 1024px)');
		match.addEventListener('change', (e) => {
			console.log(e);
			this.store.update({
				expanded: e.matches,
			});
		});
	}

	manualToggle(): void {
		this.store.update({
			expanded: !this.store.getValue().expanded,
		});
	}
}
