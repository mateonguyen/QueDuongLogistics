import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppQuery } from './__core/states/app/app.query';
import { AppService } from './__core/states/app/app.service';
import { AccountQuery } from './__states/account/account.query';
import { AccountService } from './__states/account/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	constructor(
		public accountQuery: AccountQuery,
		private accountService: AccountService,
		public appQuery: AppQuery,
		private _appService: AppService,
		private router: Router
	) {
		this._appService.appStart();
	}

	ngOnInit(): void {
		if (this.accountQuery.isLoggedIn()) {
			const date = new Date().getTime();
			const expirationDate = new Date(
				this.accountService.getDecoderToken(this.accountQuery.getValue().token)
					.exp * 1000
			).getTime();

			this.accountService.autoLogout(expirationDate - date);
		} else {
			// this.accountService.logout();
			this.router.navigateByUrl('login');
		}

		// if (sessionStorage.getItem('visit') === null) {
		// 	//New visit and pageview
		// 	this._appService.updateCounter('visit-pageview');
		// } else {
		// 	// Pageview
		// 	this._appService.updateCounter('pageview');
		// }

		// sessionStorage.setItem('visit', 'x');
	}

}
