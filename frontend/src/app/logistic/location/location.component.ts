import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Location } from 'src/app/__models/location';
import { LocationService } from 'src/app/__services/location.service';
import { removeVI } from 'jsrmvi';
import { AddLocationModalComponent } from './add-location-modal/add-location-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: LocationService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
	}

	openEditModal(model?: Location) {
		let initialState = {
			title: 'Thêm mới Địa điểm',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Địa điểm';
		} else {
			initialState.title = 'Sửa thông tin Địa điểm';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddLocationModalComponent,
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

	onDelete(model: Location) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Địa điểm <strong>#' + model.locationName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Location[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Địa điểm <strong>' + model.locationName + '</strong>',
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
