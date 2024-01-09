import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/__models/driver';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { DriverService } from 'src/app/__services/driver.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-add-driver-modal',
	templateUrl: 'add-driver-modal.component.html',
	styleUrls: ['add-driver-modal.component.scss']
})
export class AddDriverModalComponent implements OnInit {
	@Output() submited = new EventEmitter();
	title?: string;
	editForm: FormGroup;
	model: Driver;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: DriverService,
		private _notificationService: NzNotificationService,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			fullName: [this.model?.fullName, Validators.required],
			dateOfBirth: [this.model ? new Date(this.model.dateOfBirth.replace(pattern, '$1-$2-$3')) : '', Validators.required],
			phoneNo: [this.model?.phoneNo, Validators.required],
			identityCardNo: [this.model?.identityCardNo, Validators.required],
			issueDate: [this.model ? new Date(this.model.issueDate.replace(pattern, '$1-$2-$3')) : '', Validators.required],
			issuePlace: [this.model?.issuePlace, Validators.required],
			homeTown: [this.model?.homeTown, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();

		// convert Date to right format
		let formValue = this.editForm.value;
		formValue.dateOfBirth = this.datePipe.transform(formValue.dateOfBirth, 'yyyyMMdd');
		formValue.issueDate = this.datePipe.transform(formValue.issueDate, 'yyyyMMdd');

		if (!this.model) {
			this._dataService.create(formValue as Driver).subscribe({
				next: res => {
					// this._dataService.list = res as Driver[];
					this.submited.emit();
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
			this._dataService.update(formValue as Driver).subscribe({
				next: res => {
					// this._dataService.list = res as Driver[];
					this.submited.emit();

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
