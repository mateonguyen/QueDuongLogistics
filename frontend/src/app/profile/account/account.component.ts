import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { base64ToFile } from 'ngx-image-cropper';
import { User } from 'src/app/__models/user';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { AccountService } from 'src/app/__states/account/account.service';
import { AvatarCropperComponent } from './avatar-cropper/avatar-cropper.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
	@ViewChild('fileInput') fileInput: ElementRef;
	model: User;
	avatar: any = '';
	editForm: FormGroup;
	// bsModalRef?: BsModalRef;

	constructor(
		public accountQuery: AccountQuery,
		// private _modalService: BsModalService,
		private _modalService: NzModalService,
		private _fb: FormBuilder,
		private _accountService: AccountService,
		private _sanitizer: DomSanitizer,
		private _notificationService: NzNotificationService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit(): void {
		this.accountQuery.currentUser$.subscribe((user: User) => (this.model = user));

		this.initForm();
	}

	initForm() {
		if (this.model.photo) {
			this.avatar = 'data:image/png;base64,' + this.model.photo;

		}

		this.editForm = this._fb.group({
			id: [this.model?.id],
			userName: [this.model?.userName],
			fullName: [this.model?.fullName, Validators.required],
			biography: [this.model?.biography],
			photo: [this.model?.photo]
		});
	}

	openFileInput(): void {
		this.fileInput.nativeElement.click();
	}

	fileChangeEvent(event: any): void {
		const cropperModalRef = this._modalService.create({
			nzContent: AvatarCropperComponent,
			nzClosable: false,
			nzFooter: null,
			nzWidth: 700,
			nzComponentParams: {
				imageChangedEvent: event
			},
			// nzOnOk: () => this.handleOk()
		});

		cropperModalRef.afterClose.subscribe(result => {
			if (result) {
				this.avatar = result;
				this.cdr.detectChanges();
			}
		});

		this._modalService.afterAllClose.subscribe(() => {
			this.fileInput.nativeElement.value = '';
		});
	}

	save() {
		var formData: any = new FormData();
		formData.append("id", this.editForm.value['id']);
		formData.append('fullName', this.editForm.value['fullName']);
		formData.append('userName', this.editForm.value['userName']);
		formData.append('biography', this.editForm.value['biography']);
		formData.append('photoFile', base64ToFile(this.avatar));

		this._accountService.editProfile(formData).subscribe({
			next: () => {
				// this._notificationService.open('Bạn vừa cập nhật thành công thông tin tài khoản.', {
				// 	label: 'Chúc mừng!',
				// 	status: TuiNotification.Success,
				// 	autoClose: 5000
				// }).subscribe();
				this._notificationService.success(
					'Chúc mừng!',
					'Bạn vừa cập nhật thành công thông tin tài khoản.',
					{ nzDuration: 5000, nzAnimate: true }
				)
			},
			error: (err) => {
				this._notificationService.error(
					'Lỗi!',
					err.error,
					{ nzDuration: 5000, nzAnimate: true }
				);
				console.log(err);
			}
		});
	}
}
