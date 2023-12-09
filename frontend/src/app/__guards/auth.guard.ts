import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { AccountQuery } from '../__states/account/account.query';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(
		private _accountQuery: AccountQuery,
		private router: Router,
		@Inject(TuiAlertService) private readonly notificationService: TuiAlertService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let roles = route.data.roles as Array<string>;

		if (roles) {
			const match = this._accountQuery.roleMatch(roles);

			if (!match) {
				// this.router.navigate(['/-/admin/users']);
				this.notificationService.open('Bạn không được cấp quyền sử dụng chức năng này!', {
					label: 'Thông báo!',
					status: TuiNotification.Error,
					autoClose: 5000
				}).subscribe();

				return false;
			}

			return true;
		}

		if (this._accountQuery.isLoggedIn()) {
			return true;
		}

		this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
		return false;
	}

	// private isAuthorized(route: )
}
