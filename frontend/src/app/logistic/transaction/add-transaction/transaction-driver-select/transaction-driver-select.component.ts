import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Driver } from 'src/app/__models/driver';
import { DriverService } from 'src/app/__services/driver.service';
import { AddDriverModalComponent } from 'src/app/logistic/driver/add-driver-modal/add-driver-modal.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-transaction-driver-select',
	templateUrl: './transaction-driver-select.component.html',
	styleUrls: ['./transaction-driver-select.component.scss']
})
export class TransactionDriverSelectComponent implements OnInit {
	@Input() control = new FormControl();
	@Output() change = new EventEmitter();
	drivers: Driver[];
	driverSelected: Driver;

	constructor(
		public driverService: DriverService,
		private _modalService: NzModalService,
		private datePipe: DatePipe
	) {
		if (!driverService.list)
			driverService.refreshList();
	}

	ngOnInit(): void {

		this.control.valueChanges.subscribe(selectedId => {
			const selectedDriver = this.driverService.list.find(driver => driver.id === selectedId);
			this.onSelectChange(selectedDriver);
		});
	}

	initForm() {

	}

	compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	onSelectChange(selectedShippingRoute): void {
		this.driverSelected = selectedShippingRoute;
		console.log(this.driverSelected);
	}

	formatHumanDate(dateString) : string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		return this.datePipe.transform(new Date(dateString.replace(pattern, '$1-$2-$3')), 'dd/MM/yyyy');
	}

	openEditModal() {
		this._modalService.create({
			nzContent: AddDriverModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Lái xe',
				model: null
			}
		});
	}
}
