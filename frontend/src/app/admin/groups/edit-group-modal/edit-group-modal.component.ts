import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Group } from 'src/app/__models/group';


@Component({
	selector: 'app-edit-add-group-modal',
	templateUrl: './edit-group-modal.component.html',
	styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit {
	// public submit = new EventEmitter();
	title?: string;
	editForm: FormGroup;
	model: Group;

	constructor(
		public _modalRef: NzModalRef,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this.fb.group({
			id: [this.model?.id],
			groupName: [this.model?.groupName, Validators.required],
			description: [this.model?.description],
			created: [this.model?.created]
		});
	}

	save() {
		this._modalRef.close(this.editForm.value);
	}

	cancel() {
		this.closeModal();
	}

	closeModal() {
		this._modalRef.close();
	}
}
