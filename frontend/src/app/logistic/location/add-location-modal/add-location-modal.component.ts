import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from 'src/app/__models/location';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { LocationService } from 'src/app/__services/location.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-add-location-modal',
	templateUrl: 'add-location-modal.component.html',
	styleUrls: ['add-location-modal.component.scss']
})
export class AddLocationModalComponent implements OnInit {
	@Output() submited = new EventEmitter();
	title?: string;
	editForm: FormGroup;
	model: Location;

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _locationService: LocationService,
		private _notificationService: NzNotificationService,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			locationCode: [this.model?.locationCode, Validators.required],
			locationName: [this.model?.locationName, Validators.required],
		});
	}

	onSubmit() {
		this._modalRef.close();
		if (!this.model) {
			this._locationService.create(this.editForm.value as Location).subscribe({
				next: res => {
					// this._dataService.list = res as Location[];
					this.submited.emit();
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa thêm mới thành công thông tin Địa điểm.',
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
			this._locationService.update(this.editForm.value as Location).subscribe({
				next: res => {
					// this._dataService.list = res as Location[];
					this.submited.emit();
					this._notificationService.success(
						'Chúc mừng!',
						'Bạn vừa chỉnh sửa thành công thông tin Địa điểm.',
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
