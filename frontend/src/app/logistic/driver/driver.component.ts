import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Driver } from 'src/app/__models/driver';
import { DriverService } from 'src/app/__services/driver.service';
import { removeVI } from 'jsrmvi';
import { AddDriverModalComponent } from './add-driver-modal/add-driver-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-driver',
	templateUrl: './driver.component.html',
	styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: DriverService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
	}

	openEditModal(model?: Driver) {
		let initialState = {
			title: 'Thêm mới Lái xe',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Lái xe';
		} else {
			initialState.title = 'Sửa thông tin Lái xe';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddDriverModalComponent,
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

	parseHumanDate(value: string): string {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		var dateProcess = new Date(value.replace(pattern, '$1-$2-$3'));
		return this.datePipe.transform(dateProcess, 'dd/MM/yyyy');
	}

	onDelete(model: Driver) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.fullName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Driver[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Lái xe <strong>' + model.fullName + '</strong>',
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
