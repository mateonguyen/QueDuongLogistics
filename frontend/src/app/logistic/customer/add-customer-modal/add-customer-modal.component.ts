import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/__models/customer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CustomerService } from 'src/app/__services/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LogoCropperComponent } from '../../__components/logo-cropper/logo-cropper.component';
import { base64ToFile } from 'ngx-image-cropper';

@Component({
	selector: 'app-add-customer-modal',
	templateUrl: 'add-customer-modal.component.html',
	styleUrls: ['add-customer-modal.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AddCustomerModalComponent implements OnInit {
	@ViewChild('fileInput') fileInput: ElementRef;
	@Output() submited = new EventEmitter();
	title?: string;
	editForm: FormGroup;
	model: Customer;
	photo: any = '';

	constructor(
		public _modalRef: NzModalRef,
		private _fb: FormBuilder,
		private _dataService: CustomerService,
		private _notificationService: NzNotificationService,
		private _modalService: NzModalService,
		private _cdr: ChangeDetectorRef,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		if (this.model?.photo) {
			this.photo = 'data:image/png;base64,' + this.model.photo;

		}
		this.editForm = this._fb.group({
			id: [this.model?.id ?? 0],
			customerCode: [this.model?.customerCode, Validators.required],
			customerName: [this.model?.customerName, Validators.required],
			photo: [this.model?.photo]
		});
	}

	openFileInput(): void {
		this.fileInput.nativeElement.click();
	}

	fileChangeEvent(event: any): void {
		const cropperModalRef = this._modalService.create({
			nzContent: LogoCropperComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				imageChangedEvent: event
			},
		});

		cropperModalRef.afterClose.subscribe(result => {
			if (result) {
				this.photo = result;
				this._cdr.detectChanges();
			}
		});

		this._modalService.afterAllClose.subscribe(() => {
			this.fileInput.nativeElement.value = '';
		});
	}

	onSubmit() {
		var formData: any = new FormData();
		formData.append('customerCode', this.editForm.value['customerCode']);
		formData.append('customerName', this.editForm.value['customerName']);
		// formData.append('photoFile', this.photo ?? base64ToFile(this.photo));
		formData.append('photoFile', base64ToFile(this.photo));


		this._modalRef.close();
		if (!this.model) {
			formData.append("id", 0);

			this._dataService.create(formData).subscribe({
				next: _ => {
					// this._dataService.list = res as Customer[];
					this.submited.emit();
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
			formData.append("id", this.model.id);

			this._dataService.update(formData).subscribe({
				next: res => {
					// this._dataService.list = res as Customer[];
					this.submited.emit();
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
