import { Component, OnInit } from '@angular/core';
import { AccountQuery } from '../__core/states/account/account.query';
import { User } from '../__models/user';

// declare function SayHello(): any;
// declare function vgca_sign_approved(prms: any, SignFileCallBack: any): any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {
	currentUser: User;

	constructor(
		private _accountQuery: AccountQuery
	) { }

	ngOnInit(): void {
		// SayHello();
		this._accountQuery.currentUser$.subscribe((user) => this.currentUser = user)
	}

}
