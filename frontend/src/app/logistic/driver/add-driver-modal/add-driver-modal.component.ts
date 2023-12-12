import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/__models/driver';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DriverService } from 'src/app/__services/driver.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-add-driver-modal',
	templateUrl: 'add-driver-modal.component.html',
	styleUrls: ['add-driver-modal.component.scss']
})
export class AddDriverModalComponent implements OnInit {
	title?: string;
	editForm: FormGroup;
	model: Driver;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: DriverService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			fullName: [this.model?.fullName, Validators.required],
			dateOfBirth: [this.model?.dateOfBirth, Validators.required],
			phoneNo: [this.model?.phoneNo, Validators.required],
			identityCardNo: [this.model?.identityCardNo, Validators.required],
			issueDate: [this.model?.issueDate, Validators.required],
			issuePlace: [this.model?.issuePlace, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._dataService.create(this.editForm.value as Driver).subscribe({
				next: res => {
					this._dataService.list = res as Driver[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Lái xe.',
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
			this._dataService.update(this.editForm.value as Driver).subscribe({
				next: res => {
					this._dataService.list = res as Driver[];
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Lái xe.',
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
