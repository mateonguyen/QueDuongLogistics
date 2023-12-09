import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountQuery } from '../__states/account/account.query';

@Directive({
	selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
	@Input() appHasRole: string[];
	roles: string[];

	constructor(
		private _viewContainerRef: ViewContainerRef,
		private _templateRef: TemplateRef<any>,
		private _accountQuery: AccountQuery
	) {
		this._accountQuery.roles$.subscribe(roles => {
			this.roles = roles;
		})
	}

	ngOnInit(): void {
		if (!this.roles || this.roles == null) {
			this._viewContainerRef.clear();
			return;
		}

		if (this.roles.some(x => this.appHasRole.includes(x))) {
			this._viewContainerRef.createEmbeddedView(this._templateRef);
		} else {
			this._viewContainerRef.clear();
		}
	}

}
