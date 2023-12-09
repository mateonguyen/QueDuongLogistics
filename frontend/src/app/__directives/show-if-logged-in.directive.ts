import {
	Directive,
	Input,
	OnDestroy,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountQuery } from '../__states/account/account.query';

@Directive({ selector: '[ShowIfLoggedIn]' })
export class ShowIfLoggedInDirective implements OnInit, OnDestroy {

	subscription: Subscription;
	@Input() ShowIfLoggedIn: boolean;

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private accountQuery: AccountQuery
	) { }

	ngOnInit(): void {
		this.subscription = this.accountQuery.isLoggedIn$.subscribe(
			(isLoggedIn) => {
				this.viewContainer.clear();
				if (isLoggedIn) {
					if (this.ShowIfLoggedIn) {
						this.viewContainer.createEmbeddedView(this.templateRef);
					} else {
						this.viewContainer.clear();
					}
				} else {
					if (this.ShowIfLoggedIn) {
						this.viewContainer.clear();
					} else {
						this.viewContainer.createEmbeddedView(this.templateRef);
					}
				}
			}
		);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
