import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AccountState, AccountStore } from './account.store';

@Injectable({
  providedIn: 'root',
})
export class AccountQuery extends Query<AccountState> {
  currentUser$ = this.select('user');
  roles$ = this.select('roles');
  isLoggedIn$ = this.select((state) => !!state.token);
  alerts$ = this.select('alerts');

  constructor(protected store: AccountStore) {
    super(store);
  }

  isLoggedIn() {
    return !!this.getValue().token;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.store.getValue().roles as Array<string>;

    // console.log('UserRoles: ' + userRoles);

    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
}
