import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { base64ToFile } from 'ngx-image-cropper';
import { User } from 'src/app/__models/user';
import { AccountQuery } from 'src/app/__states/account/account.query';
import { AccountService } from 'src/app/__states/account/account.service';
import { AvatarCropperComponent } from './avatar-cropper/avatar-cropper.component';

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
	bsModalRef?: BsModalRef;

	constructor(
		public accountQuery: AccountQuery,
		private _modalService: BsModalService,
		private _fb: FormBuilder,
		private _accountService: AccountService,
		private _sanitizer: DomSanitizer,
		@Inject(TuiAlertService) private readonly _notificationService: TuiAlertService
	) { }

	ngOnInit(): void {
		this.accountQuery.currentUser$.subscribe((user: User) => (this.model = user));

		this.initForm();
	}

	initForm() {
		if (this.model.photo) {
			this.avatar = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.model.photo);

		}

		this.editForm = this._fb.group({
			id: [this.model?.id],
			userName: [this.model?.userName],
			fullName: [this.model?.fullName, Validators.required],
			biography: [this.model?.biography],
			photo: [this.model?.photo]
		});
	}

	fileChangeEvent(event: any): void {
		let initialState = {};

		if (event) {
			initialState = {
				imageChangedEvent: event,
			};
		}

		this.bsModalRef = this._modalService.show(AvatarCropperComponent, { initialState });

		this.bsModalRef.content.submit.subscribe((croppedImage) => {
			this.avatar = croppedImage;
		});

		this._modalService.onHide.subscribe(() => {
			this.fileInput.nativeElement.value = '';
		});
	}

	save() {
		this.editForm.value['photo'] = base64ToFile(this.avatar);

		var formData: any = new FormData();
		formData.append("id", this.editForm.value['id']);
		formData.append('fullName', this.editForm.value['fullName']);
		formData.append('userName', this.editForm.value['userName']);
		formData.append('biography', this.editForm.value['biography']);
		formData.append('photoFile', base64ToFile(this.avatar));

		this._accountService.editProfile(formData).subscribe((res) => {
			this._notificationService.open('Bạn vừa cập nhật thành công thông tin tài khoản.', {
				label: 'Chúc mừng!',
				status: TuiNotification.Success,
				autoClose: 5000
			}).subscribe();
		}, (err) => {
			this._notificationService.open('Không thành công. Có lỗi xảy ra trong quá trình cập nhật thông tin tài khoản.', {
				label: 'Lỗi!',
				status: TuiNotification.Error,
				autoClose: 5000
			}).subscribe();
			console.log(err);
		});
	}

}
