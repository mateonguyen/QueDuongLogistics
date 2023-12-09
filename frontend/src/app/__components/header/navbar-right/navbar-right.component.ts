import { Component } from '@angular/core';
import { User } from 'src/app/__models/user';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { AccountService } from 'src/app/__states/account/account.service';

@Component({
	selector: 'app-navbar-right',
	templateUrl: './navbar-right.component.html',
	styleUrls: ['./navbar-right.component.scss'],
})
export class NavbarRightComponent {
	currentUser: User;

	constructor(
		private accountService: AccountService,
		public accountQuery: AccountQuery
	) { }

	logout() {
		this.accountService.logout();
	}
}
