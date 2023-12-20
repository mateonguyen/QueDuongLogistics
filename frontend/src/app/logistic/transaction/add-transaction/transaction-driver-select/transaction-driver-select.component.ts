import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Driver } from 'src/app/__models/driver';
import { DriverService } from 'src/app/__services/driver.service';
import { AddDriverModalComponent } from 'src/app/logistic/driver/add-driver-modal/add-driver-modal.component';

@Component({
	selector: 'app-transaction-driver-select',
	templateUrl: './transaction-driver-select.component.html',
	styleUrls: ['./transaction-driver-select.component.scss']
})
export class TransactionDriverSelectComponent implements OnInit {
	@Input() model: Driver;
	@Output() change = new EventEmitter();
	drivers: Driver[];
	// model: Driver;

	constructor(
		public driverService: DriverService,
		private _modalService: NzModalService,
		// private datePipe: DatePipe
	) {
		if (!driverService.list)
			driverService.refreshList();
	}

	ngOnInit(): void {
	}

	compareFn = (o1: Driver, o2: Driver): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

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
