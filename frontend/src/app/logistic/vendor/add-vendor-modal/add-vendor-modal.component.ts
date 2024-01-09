import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vendor } from 'src/app/__models/vendor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { VendorService } from 'src/app/__services/vendor.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-add-vendor-modal',
	templateUrl: 'add-vendor-modal.component.html',
	styleUrls: ['add-vendor-modal.component.scss']
})
export class AddVendorModalComponent implements OnInit {
	@Output() submited = new EventEmitter();
	title?: string;
	editForm: FormGroup;
	model: Vendor;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: VendorService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			vendorCode: [this.model?.vendorCode, Validators.required],
			vendorName: [this.model?.vendorName, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._dataService.create(this.editForm.value as Vendor).subscribe({
				next: res => {
					// this._dataService.list = res as Vendor[];
					this.submited.emit();
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Nhà cung cấp.',
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
			this._dataService.update(this.editForm.value as Vendor).subscribe({
				next: res => {
					// this._dataService.list = res as Vendor[];
					this.submited.emit();
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Nhà cung cấp.',
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
