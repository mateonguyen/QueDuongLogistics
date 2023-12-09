import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { LoadingState, LoadingStore } from './loading.store';

@Injectable({
  providedIn: 'root',
})
export class LoadingQuery extends Query<LoadingState> {
  isLoading$ = this.selectLoading();

  constructor(protected store: LoadingStore) {
    super(store);
  }
}
