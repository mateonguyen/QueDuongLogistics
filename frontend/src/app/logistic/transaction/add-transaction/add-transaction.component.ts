import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';
import { Transaction } from 'src/app/__models/transaction';
import { TransactionDetails } from 'src/app/__models/transactionDetails';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, CanComponentDeactivate {
	editForm: FormGroup;
	globalError: string;
	transaction: Transaction = new Transaction();
	transactionDetails: TransactionDetails[] = [];
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
		// 	id: [this.transaction?.id ?? 0],
		// 	demurrageFee : [this.transaction?.demurrageFee ?? 0],
		// });
	}

	onDriverChange(selectedData) {
		this.transaction.driver = selectedData;
		this.transaction.driverId = selectedData.id;
	}

	onVehicleChange(selectedData) {
		this.transaction.vehicle = selectedData;
		this.transaction.vehicleId = selectedData.id;
	}

	onShippingRouteChange(selectedData) {
		this.transaction.shippingRoute = selectedData;
	}

	handleModelChange(updatedModel: TransactionDetails[]) {
		this.transaction.transactionDetails = updatedModel;
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
