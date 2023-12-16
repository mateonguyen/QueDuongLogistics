import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShippingRoute } from 'src/app/__models/shipping-route';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ShippingRouteService } from 'src/app/__services/shipping-route.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-add-shipping-route-modal',
	templateUrl: 'add-shipping-route-modal.component.html',
	styleUrls: ['add-shipping-route-modal.component.scss']
})
export class AddShippingRouteModalComponent implements OnInit {
	title?: string;
	editForm: FormGroup;
	model: ShippingRoute;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: ShippingRouteService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			routeCode: [this.model?.routeCode, Validators.required],
			origin: [this.model?.origin, Validators.required],
			destination: [this.model?.destination, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._dataService.create(this.editForm.value as ShippingRoute).subscribe({
				next: res => {
					this._dataService.list = res as ShippingRoute[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Tuyến đường.',
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
			this._dataService.update(this.editForm.value as ShippingRoute).subscribe({
				next: res => {
					this._dataService.list = res as ShippingRoute[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Tuyến đường.',
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