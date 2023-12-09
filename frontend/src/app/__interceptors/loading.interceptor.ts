import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { AppService } from '../__core/states/app/app.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(
		private _appService: AppService
	) { }

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		// this._appService.updateCounter();
		this._appService.busy();

		return next.handle(request).pipe(
			delay(500),
			finalize(() => {
				this._appService.idle();
			})
		);
	}
}
