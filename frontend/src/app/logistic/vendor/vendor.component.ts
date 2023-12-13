import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Vendor } from 'src/app/__models/vendor';
import { VendorService } from 'src/app/__services/vendor.service';
import { removeVI } from 'jsrmvi';
import { AddVendorModalComponent } from './add-vendor-modal/add-vendor-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-vendor',
	templateUrl: './vendor.component.html',
	styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: VendorService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
	}

	openEditModal(model?: Vendor) {
		let initialState = {
			title: 'Thêm mới Nhà cung cấp',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Nhà cung cấp';
		} else {
			initialState.title = 'Sửa thông tin Nhà cung cấp';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddVendorModalComponent,
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

	onDelete(model: Vendor) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Nhóm người dùng <strong>#' + model.vendorName + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as Vendor[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Nhà cung cấp <strong>' + model.vendorName + '</strong>',
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
