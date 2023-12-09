import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Account } from 'src/app/__models/account';
import { Alert } from 'src/app/__models/ui-models/alert';
import * as storage from 'src/app/__states/account/storage';

export interface AccountState extends EntityState<Account> {
	timer: any;
	alerts: Alert[];
}

export function createInitialState(): AccountState {
	return {
		token: null,
		roles: null,
		user: null,
		alerts: [],
		...storage.getSession(),
	} as AccountState;
}

@Injectable({
	providedIn: 'root',
})
@StoreConfig({ name: 'account', resettable: true })
export class AccountStore extends EntityStore<AccountState> {
	constructor() {
		super(createInitialState());
	}
}
