import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Role } from 'src/app/__models/role';


@Component({
	selector: 'app-edit-add-role-modal',
	templateUrl: './edit-role-modal.component.html',
	styleUrls: ['./edit-role-modal.component.scss']
})
export class EditRoleModalComponent implements OnInit {
	public submit = new EventEmitter();

	title?: string;

	editForm: FormGroup;

	model: Role;
	roles: Role[];

	constructor(
		private _fb: FormBuilder,
		private _modalRef: NzModalRef,
	) { }

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.editForm = this._fb.group({
			id: [this.model?.id],
			name: [this.model?.name, Validators.required],
			description: [this.model?.description]
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
