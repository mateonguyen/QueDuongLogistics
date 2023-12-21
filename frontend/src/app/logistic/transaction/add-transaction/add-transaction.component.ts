import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';
import { Transaction } from 'src/app/__models/transaction';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, CanComponentDeactivate {
	editForm: FormGroup;
	globalError: string;
	transaction: Transaction = new Transaction();
	showNoResult: boolean = false;

	get f() {
		return this.editForm?.controls;
	}

	constructor(
		private _fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		// this.editForm = this._fb.group({
		// 	customerId: [this.model?.customerId],
		// 	customer: [this.model?.customer],
		// 	driverId: [this.model?.driverId],
		// 	driver: [this.model?.driver]
		// });
	}

	onDriverChange(selectedDriver) {
		this.transaction.driver = selectedDriver;
	}

	onVehicleChange(selectedVehicle) {
		this.transaction.vehicle = selectedVehicle;
	}

	save() {
		console.log(this.transaction);
	}

	canDeactivate(): boolean {
		if (this.editForm.dirty) {
			return confirm('Bạn có chắc chắn muốn tiếp tục? Dữ liệu có thể sẽ bị mất nếu không lưu.')
		}
		return true;
	}
}
