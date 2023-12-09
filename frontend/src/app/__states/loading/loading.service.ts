import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingStore } from './loading.store';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	busyRequestCount = 0;

	constructor(
		private store: LoadingStore,
		private spinnerService: NgxSpinnerService
	) { }

	setLoading(isLoading: boolean) {
		this.store.setLoading(isLoading);
	}

	busy() {
		this.busyRequestCount++;
		// this.setLoading(true);
		this.spinnerService.show();
	}

	idle() {
		this.busyRequestCount--;
		if (this.busyRequestCount <= 0) {
			this.busyRequestCount = 0;
			// this.setLoading(false);
			this.spinnerService.hide();
		}
	}
}
