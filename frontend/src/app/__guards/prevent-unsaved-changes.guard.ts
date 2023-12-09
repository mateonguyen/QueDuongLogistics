import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddTransactionComponent } from '../logistic/transaction/add-transaction/add-transaction.component';

@Injectable({
	providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
	canDeactivate(component: AddTransactionComponent): boolean {
		if (component.transactionForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}

		return true;
	}

}
