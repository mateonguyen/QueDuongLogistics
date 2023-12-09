import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SideBarLink } from 'src/app/__models/ui-models/nav-link';

export interface LayoutState {
  expanded: boolean;
  sideBarLinks: SideBarLink[];
}

export function createInitialState(): LayoutState {
  return {
    expanded: true,
    sideBarLinks: [],
  } as LayoutState;
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'layout' })
export class LayoutStore extends Store<LayoutState> {
  constructor() {
    super(createInitialState());
  }
}
