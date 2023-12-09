import { Injectable } from '@angular/core';
import { SideBarLink } from '../../models/nav-link';
import { AppStore } from './app.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VisitorCounter } from 'src/app/__models/visitor-counter';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	baseUrl: string;
	busyRequestCount = 0;

	constructor(
		private _store: AppStore,
		private _http: HttpClient,
	) {
		this.baseUrl = environment.apiUrl;
	}

	setLoading(isLoading: boolean) {
		this._store.update({ isLoading: isLoading });
	}

	appStart() {
		this.setLoading(false);
	}

	busy() {
		this.busyRequestCount++;
		this.setLoading(true);
	}

	idle() {
		this.busyRequestCount--;
		if (this.busyRequestCount <= 0) {
			this.busyRequestCount = 0;
			this.setLoading(false);
		}
	}

	setSideBarLinks(sideBarLinks: SideBarLink[]): void {
		this._store.update({
			sideBarLinks,
		});
	}

	handleResize(): void {
		const match = window.matchMedia('(min-width: 1024px)');
		match.addEventListener('change', (e) => {
			console.log(e);
			this._store.update({
				expanded: e.matches,
			});
		});
	}

	manualToggle(): void {
		this._store.update({
			expanded: !this._store.getValue().expanded,
		});
	}

	updateCounter(type: string) {
		return this._http.get(this.baseUrl + 'admin/update-counter?type=' + type);
	}

	getCounter() {
		return this._http.get<VisitorCounter>(this.baseUrl + 'admin/visitor-counter');
	}

}
