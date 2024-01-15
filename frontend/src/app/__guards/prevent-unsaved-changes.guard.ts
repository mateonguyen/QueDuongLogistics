import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
export interface CanComponentDeactivate {
	canDeactivate: () => boolean;
}
@Injectable({
	providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
	canDeactivate(component: CanComponentDeactivate): boolean {
		if (component.canDeactivate) {
			return component.canDeactivate();
		}
		return true;
	}

}
