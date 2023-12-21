import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ShippingRoute } from 'src/app/__models/shipping-route';
import { ShippingRouteService } from 'src/app/__services/shipping-route.service';
import { AddShippingRouteModalComponent } from './add-shipping-route-modal/add-shipping-route-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-shipping-route',
	templateUrl: './shipping-route.component.html',
	styleUrls: ['./shipping-route.component.scss']
})
export class ShippingRouteComponent implements OnInit {
	confirmModal?: NzModalRef;
	term = '';

	constructor(
		public dataService: ShippingRouteService,
		private _modalService: NzModalService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.dataService.refreshList();
	}

	refreshList() {
	}

	openEditModal(model?: ShippingRoute) {
		let initialState = {
			title: 'Thêm mới Tuyến đường',
			model: null
		};
		if (!model) {
			initialState.title = 'Thêm mới Tuyến đường';
		} else {
			initialState.title = 'Sửa thông tin Tuyến đường';
			initialState.model = model;
		}

		this._modalService.create({
			nzContent: AddShippingRouteModalComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				title: initialState.title,
				model: initialState.model
			}
		});
	}

	onDelete(model: ShippingRoute) {
		this.confirmModal = this._modalService.confirm({
			nzTitle: 'Bạn chắc chắn muốn xóa?',
			nzContent: 'Sau khi chọn Xóa, Tuyến đường <strong>#' + model.routeCode + '</strong> sẽ được xóa khỏi danh sách.',
			nzOkText: 'Xóa',
			nzOkDanger: true,
			nzOnOk: () => {
				this.dataService.delete(model.id).subscribe({
					next: (res) => {
						this.dataService.list = res as ShippingRoute[];
						this._notificationService.info(
							'Thông báo!',
							'Bạn vừa xóa thành công Tuyến đường <strong>' + model.routeCode + '</strong>',
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
