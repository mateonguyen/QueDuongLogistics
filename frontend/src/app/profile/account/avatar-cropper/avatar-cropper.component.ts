import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
	selector: 'app-avatar-cropper',
	templateUrl: './avatar-cropper.component.html',
	styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperComponent implements OnInit {
	@Output() submit = new EventEmitter();

	imageChangedEvent: any = '';
	croppedImage: any = '';
	scale = 1;
	transform: ImageTransform = {
		translateUnit: 'px'
	}

	constructor(
		public _modalRef: NzModalRef,
		private _sanitizer: DomSanitizer
	) { }

	ngOnInit(): void {
	}

	onSubmit() {
		// Pass cropped image to parent
		// this.submit.emit(this.croppedImage);
		this._modalRef.destroy(this.croppedImage);

		this.close();
	}

	close() {
		this._modalRef.close();
	}

	zoomOut() {
		this.scale -= .1;
		this.transform = {
			...this.transform,
			scale: this.scale
		}
	}

	zoomIn() {
		this.scale += .1;
		this.transform = {
			...this.transform,
			scale: this.scale
		}
	}

	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
	}
}
