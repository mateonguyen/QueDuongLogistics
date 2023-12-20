import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
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
	@Input() control = new FormControl();
	@Output() change = new EventEmitter();
	vehicles: Vehicle[];
	vehicleSelected: Vehicle;

	constructor(
		public vehicleService: VehicleService,
		private _modalService: NzModalService,
    private datePipe: DatePipe
	) {
		if (!vehicleService.list)
			vehicleService.refreshList();
	}

	ngOnInit(): void {
		this.control.valueChanges.subscribe(selectedId  => {
			const selectedVehicle = this.vehicleService.list.find(vehicle => vehicle.id === selectedId);
			this.onSelectChange(selectedVehicle);
		});
	}

  	initForm() {

	}

	compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);

	onSelectChange(selectedVehicle): void {
		this.vehicleSelected = selectedVehicle;
		console.log(this.vehicleSelected);
	}

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
