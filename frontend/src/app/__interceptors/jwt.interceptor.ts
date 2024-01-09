import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountQuery } from '../__states/account/account.query';
import { AccountService } from '../__states/account/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private accountQuery: AccountQuery,
		private accountService: AccountService,
		private router: Router
	) { }

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token = this.accountQuery.getValue().token;

		if (this.accountQuery.isLoggedIn()) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
			// const date = new Date().getTime();
			// const expirationDate = new Date(
			// 	this.accountService.getDecoderToken(token).exp * 1000
			// ).getTime();

			// this.accountService.autoLogout(expirationDate - date);
		} else {
			// this.accountService.logout();
			this.router.navigateByUrl('login');
		}

		return next.handle(request);
	}
}
