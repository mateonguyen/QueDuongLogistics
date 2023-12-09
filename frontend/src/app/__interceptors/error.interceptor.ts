import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private router: Router) { }

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error) => {
				if (error) {
					switch (error.status) {
						case 400:
							if (error.error.errors) {
								const modalStateErrors = [];
								for (const key in error.error.errors) {
									if (error.error.errors[key]) {
										modalStateErrors.push(error.error.errors[key]);
									}
								}
								throw modalStateErrors.flat();
							} else if (typeof error.error === 'object') {
								console.error(error.status, error.error);
							} else {
								console.error(error.status, error.error);
							}
							break;
						case 401:
							console.error(error.status, error.error);
							break;
						case 404:
							this.router.navigateByUrl('/not-found');
							break;
						// case 500:
						// 	const navigationExtras: NavigationExtras = {
						// 		state: { error: error.error },
						// 	};
						// 	this.router.navigateByUrl('/server-error', navigationExtras);
						// 	break;
						default:
							console.log(error);
							break;
					}
				}
				return throwError(error);
			})
		);
	}
}
