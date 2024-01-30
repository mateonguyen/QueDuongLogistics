import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountStore } from './account.store';
import * as storage from 'src/app/__states/account/storage';
import { Alert } from 'src/app/__models/ui-models/alert';
import { arrayAdd } from '@datorama/akita';
import { Account } from 'src/app/__models/account';
import { User } from 'src/app/__models/user';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	baseUrl: string;
	timeout: any;

	constructor(
		private http: HttpClient,
		private store: AccountStore,
		private router: Router
	) {
		this.baseUrl = environment.apiUrl;
	}

	login(model: any) {
		debugger;
		storage.clearSession();

		return this.http.post(this.baseUrl + 'account/login', model).pipe(
			map((account: Account) => {
				if (account) {

					this.store.update((state) => {

						const myRoles = this.getDecoderToken(account.token).role;
						if (myRoles) {
							Array.isArray(myRoles) ? account.roles = myRoles : account.roles.push(myRoles);
						}
						// account.user.photo = 'data:image/png;base64,' + account.user.photo;

						return {
							...account
						}
					});

					storage.saveSession(account);

					const date = new Date().getTime();
					const expirationDate = new Date(
						this.getDecoderToken(account.token).exp * 1000
					).getTime();

					this.autoLogout(expirationDate - date);
				}
			})
		);
	}

	logout() {
		this.http.post(this.baseUrl + 'account/logout', {}).subscribe(() => {
			this.store.reset();
			storage.clearSession();
			this.router.navigateByUrl('/login');
		})
	}

	changePassword(model: any) {
		return this.http.post(this.baseUrl + 'account/change-password', model, { responseType: 'text' });
	}

	autoLogout(expirationDate: number) {
		clearTimeout(this.timeout);

		this.timeout = setTimeout(() => {
			this.logout();
		}, expirationDate);
	}

	getDecoderToken(token) {
		return JSON.parse(atob(token.split('.')[1]));
	}

	alert(alert: Alert) {
		this.store.update((state) => {
			const alerts = arrayAdd(state.alerts, alert);
			return {
				...state,
				alerts,
			};
		});
	}

	editProfile(profile: FormData) {
		return this.http.post(this.baseUrl + 'account/edit-profile', profile).pipe(
			map((profile: User) => {

				if (profile) {
					this.store.update({
						user: profile
					});
				}
			})
		);
	}

}
