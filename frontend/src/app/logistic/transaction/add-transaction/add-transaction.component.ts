import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../../__guards/prevent-unsaved-changes.guard';
import { Transaction } from 'src/app/__models/transaction';
import { TransactionDetails } from 'src/app/__models/transactionDetails';
import { Customer } from 'src/app/__models/customer';
import { Driver } from 'src/app/__models/driver';
import { Vehicle } from 'src/app/__models/vehicle';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.component.html',
	styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit, CanComponentDeactivate {
	@ViewChild("editForm") editForm: NgForm;
	@HostListener('window:beforeunload', ['event']) unloadNotification($event: any) {
		if (this.editForm.dirty) {
			$event.returnValue = true;
		}
	}
	globalError: string;
	transaction: Transaction = new Transaction();
	transactionDetails: TransactionDetails[] = [];
	showNoResult: boolean = false;


	constructor(
	) { }

	ngOnInit(): void {
		// this.initForm();
	}

	initForm() {
		// this.editForm = this._fb.group({
		// 	id: [this.transaction?.id ?? 0],
		// 	demurrageFee : [this.transaction?.demurrageFee ?? 0],
		// });
	}

	onCustomerChange(customer: Customer) {
		this.transaction.customer = customer;
		this.transaction.customerId = customer.id;
	}

	onDriverChange(driver: Driver) {
		this.transaction.driver = driver;
		this.transaction.driverId = driver.id;
	}

	onVehicleChange(vehicle: Vehicle) {
		this.transaction.vehicle = vehicle;
		this.transaction.vehicleId = vehicle.id;
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
