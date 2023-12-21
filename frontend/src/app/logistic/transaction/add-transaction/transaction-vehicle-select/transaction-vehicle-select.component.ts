import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Vehicle } from 'src/app/__models/vehicle';
import { VehicleService } from 'src/app/__services/vehicle.service';
import { AddVehicleModalComponent } from 'src/app/logistic/vehicle/add-vehicle-modal/add-vehicle-modal.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-transaction-vehicle-select',
	templateUrl: './transaction-vehicle-select.component.html',
	styleUrls: ['./transaction-vehicle-select.component.scss']
})
export class TransactionVehicleSelectComponent implements OnInit {
	@Input() model: Vehicle;
	@Output() change = new EventEmitter();
	vehicles: Vehicle[];

	constructor(
		public vehicleService: VehicleService,
		private _modalService: NzModalService,
    	private datePipe: DatePipe
	) {
		if (!vehicleService.list)
			vehicleService.refreshList();
	}

	ngOnInit(): void {
	}

	onVehicleChange() {
		this.change.emit(this.model);
	}

	compareFn = (o1: Vehicle, o2: Vehicle): boolean => (o1 && o2 ? o1.id === o2.id : o1 === o2);

	openEditModal() {
		this._modalService.create({
			nzContent: AddVehicleModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: 'Thêm mới Phương tiện',
				model: null
			}
		});
	}
}
