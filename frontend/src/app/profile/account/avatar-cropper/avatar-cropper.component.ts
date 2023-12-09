import { Component, EventEmitter, OnInit } from '@angular/core';
// import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
	selector: 'app-avatar-cropper',
	templateUrl: './avatar-cropper.component.html',
	styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperComponent implements OnInit {
	public submit = new EventEmitter();

	imageChangedEvent: any = '';
	croppedImage: any = '';
	scale = 1;
	transform: ImageTransform = {}

	constructor(
		public bsModalRef: BsModalRef
	) { }

	ngOnInit(): void {
	}

	save() {
		this.submit.emit(this.croppedImage);
		this.bsModalRef.hide();
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

		// let b64Data = event.base64.split(',', 2)[1];
		// var byteArray = new Buffer(b64Data, 'base64');

		// // this.croppedImage = btoa(event.base64);
		// console.log(byteArray);
	}
}
