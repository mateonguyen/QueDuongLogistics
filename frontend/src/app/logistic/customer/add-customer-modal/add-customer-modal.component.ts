import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/__models/customer';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CustomerService } from 'src/app/__services/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-add-customer-modal',
	templateUrl: 'add-customer-modal.component.html',
	styleUrls: ['add-customer-modal.component.scss']
})
export class AddCustomerModalComponent implements OnInit {
	title?: string;
	editForm: FormGroup;
	model: Customer;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: CustomerService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			customerCode: [this.model?.customerCode, Validators.required],
			customerName: [this.model?.customerName, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._dataService.create(this.editForm.value as Customer).subscribe({
				next: res => {
					this._dataService.list = res as Customer[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Khách hàng.',
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
			this._dataService.update(this.editForm.value as Customer).subscribe({
				next: res => {
					this._dataService.list = res as Customer[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Khách hàng.',
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
