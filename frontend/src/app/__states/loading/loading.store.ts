import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface LoadingState { }

export function createInitialState(): LoadingState {
	return {} as LoadingState;
}

@Injectable({
	providedIn: 'root',
})
@StoreConfig({ name: 'loading' })
export class LoadingStore extends Store<LoadingState> {
	constructor() {
		super(createInitialState());
	}
}
