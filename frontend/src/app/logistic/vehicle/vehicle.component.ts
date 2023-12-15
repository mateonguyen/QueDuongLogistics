import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Vehicle } from 'src/app/__models/vehicle';
import { VehicleService } from 'src/app/__services/vehicle.service';
import { removeVI } from 'jsrmvi';
import { AddVehicleModalComponent } from './add-vehicle-modal/add-vehicle-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-vehicle',
	templateUrl: './vehicle.component.html',
	styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: VehicleService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
	}

	openEditModal(model?: Vehicle) {
		let initialState = {
			title: 'Thêm mới Phương tiện',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Phương tiện';
		} else {
			initialState.title = 'Sửa thông tin Phương tiện';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddVehicleModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});
	}

	incrementAndParse(value: string): number {
		// Parse the string to an integer and increment
		return parseInt(value, 10) + 1;
	}

	onDelete(model: Vehicle) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Phương tiện <strong>#' + model.typeOfVehicle + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Vehicle[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Phương tiện <strong>' + model.typeOfVehicle + '</strong>',
							{ nzDuration: 5000, nzAnimate: true }
						)
					},
					error: (err) => {
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
		})
	}

}
