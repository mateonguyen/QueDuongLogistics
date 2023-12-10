import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';

@Component({
	selector: 'app-add-customer',
	templateUrl: './add-customer.component.html',
	styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, CanComponentDeactivate {
	customerForm: FormGroup;
	globalError: string;

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.customerForm = this._fb.group({

		});
	}

	save() { }

	canDeactivate(): boolean {
		if (this.customerForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}
		return true;
	}
}
