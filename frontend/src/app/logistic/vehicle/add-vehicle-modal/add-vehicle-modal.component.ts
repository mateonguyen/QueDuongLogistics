import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from 'src/app/__models/vehicle';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { VehicleService } from 'src/app/__services/vehicle.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
	selector: 'app-add-vehicle-modal',
	templateUrl: 'add-vehicle-modal.component.html',
	styleUrls: ['add-vehicle-modal.component.scss']
})
export class AddVehicleModalComponent implements OnInit {
	title?: string;
	editForm: FormGroup;
	model: Vehicle;
	selectedDate: Date | null = null;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: VehicleService,
		private _notificationService: NzNotificationService
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			typeOfVehicle: [this.model?.typeOfVehicle, Validators.required],
			vehicleNumber: [this.model?.vehicleNumber, Validators.required],
			cargoBoxSize: [this.model?.cargoBoxSize, Validators.required],
			payloadCapacity: [this.model?.payloadCapacity, Validators.required],
			payloadCapacityUnit: [this.model?.payloadCapacityUnit, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._dataService.create(this.editForm.value as Vehicle).subscribe({
				next: res => {
					this._dataService.list = res as Vehicle[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Phương tiện.',
						{ nzDuration: 5000, nzAnimate: true }
					)
				},
				error: err => {
					if (err.status == 400) {
						this._notificationService.error(
							'Lỗi!',
							err.error,
							{ nzDuration: 5000, nzAnimate: true }
						);
					}
				}
			});
		} else {
			this._dataService.update(this.editForm.value as Vehicle).subscribe({
				next: res => {
					this._dataService.list = res as Vehicle[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Phương tiện.',
						{ nzDuration: 5000, nzAnimate: true }
					)
				},
				error: err => {
					if (err.status == 400) {
						this._notificationService.error(
							'Lỗi!',
							err.error,
							{ nzDuration: 5000, nzAnimate: true }
						);
					}
				}
			});
		}
	}

	cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}
}
